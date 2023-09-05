module "ecs_service" {
  source = "terraform-aws-modules/ecs/aws//modules/service"

  # Service
  name        = "backend-service"
  cluster_arn = module.ecs_cluster.arn

  cpu    = 1024
  memory = 4096

  # Container definition(s)
  container_definitions = {
    backend_container = {
      image = var.backend_image_url
      port_mappings = [
        {
          name          = var.container_name
          containerPort = var.container_port
          protocol      = "tcp"
        }
      ]

      mount_points = [
        {
          sourceVolume  = "my-vol",
          containerPath = "/var/www/my-vol"
        }
      ]

      #entry_point = ["/usr/sbin/apache2", "-D", "FOREGROUND"]

      # Example image used requires access to write to root filesystem
      readonly_root_filesystem = false
    }
  }
  service_connect_configuration = {
    namespace = aws_service_discovery_http_namespace.this.arn
    service = {
      client_alias = {
        port     = var.container_port
        dns_name = var.container_name
      }
      port_name      = var.container_name
      discovery_name = var.container_name
    }
  }
  load_balancer = {
    service = {
      target_group_arn = element(module.alb.target_group_arns, 0)
      container_name   = var.container_name
      container_port   = var.container_port
    }
  }

  subnet_ids = var.vpc_private_subnets
  security_group_rules = {
    alb_http_ingress = {
      type                     = "ingress"
      from_port                = var.container_port
      to_port                  = var.container_port
      protocol                 = "tcp"
      description              = "Service port"
      source_security_group_id = module.alb_sg.security_group_id
    }
  }

  tags = {
      Name = "Afrisplash"
  }
}



resource "aws_service_discovery_http_namespace" "this" {
  name        = "example"
  description = "CloudMap namespace for example"
  tags        = {
    Name = "Afrisplash"
  }
}