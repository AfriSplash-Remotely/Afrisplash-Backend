#resource "aws_ecs_task_definition" "afri_backend_task" {
#   family = "afri_backend_family"

#    //Fragate is a type of ECS that requires awsvpc network_mode 

#   requires_compatibilities = ["FARGATE"]
#    network_mode = "awsvpc"
#    memory = "512"
#   cpu = "256"
#    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

#    container_definitions = <<EOT
#    [
#        {
#            "name": "afri_backend_container",
#            "image": "${aws_ecr_repository.ecr_repo.repository_url}",
#            "memory": 512,
#            "essential": true,
#            "portMappings": [
#                {
#                    "containerPort": 5000,
#                    "hostPost": 5000
#                }
#            ]
#        }
#    ]
 #   EOT
#}

#resource "aws_ecs_cluster" "afri_backend_cluster" {
#    name = "afri_backend_cluster"
#}
#
#resource "aws_ecs_service" "afri_backend_service" {
#    name = "afri_backend_service"
#
#    cluster = aws_ecs_cluster.afri_backend_cluster.id
#    task_definition = aws_ecs_task_definition.afri_backend_task.arn
#
#    launch_type = "FARGATE"
#    desired_count = 1
#    network_configuration {
#        subnets = ["${aws_subnet.public_subnet_b.id}", "${aws_subnet.public_subnet_b.id}"]
#        security_groups = ["${aws_security_group.afri_backend_security_group.id}"]
#        assign_public_ip = true
#    }
#}#