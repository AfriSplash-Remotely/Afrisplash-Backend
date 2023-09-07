module "alb_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.0"

  name        = var.alb_sg_name
  description = "Service security group"
  vpc_id      = var.vpc_id

  ingress_rules       = ["http-80-tcp"]
  ingress_cidr_blocks = ["0.0.0.0/0"]

  egress_rules       = ["all-all"]
  egress_cidr_blocks = var.vpc_private_subnets_cidr_blocks

  tags = {
      Name = "Afrisplash"
  }
}

module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 8.0"

  name = var.alb_name
  load_balancer_type = "application"

  vpc_id          = var.vpc_id
  subnets         = var.vpc_public_subnets
  security_groups = [module.alb_sg.security_group_id]

  http_tcp_listeners = [
    {
      port               = 80
      protocol           = "HTTP"
      target_group_index = 0
    },
  ]

  target_groups = [
    {
      name             = "Afrisplash-${var.container_name}"
      backend_protocol = "HTTP"
      backend_port     = var.container_port
      target_type      = "ip"
    },
  ]

   tags = {
      Name = "Afrisplash"
  }
}
