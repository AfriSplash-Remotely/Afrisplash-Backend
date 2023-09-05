variable "backend_image_url" {
    description = "Backend Image URL"
    type = string
}

variable "cluster_name" {
    description = "Name of the ECS cluster"
    type = string
}

variable "container_name" {
    description = "Name of Container "
    type = string
}

variable "container_port" {
    description = "Container Port Number"
    type = number
}

variable "alb_sg_name" {
    description = "Autoscaling security group name"
    type = string
}

variable "alb_name" {
    description = "Name of application load balancer"
    type = string
}

variable vpc_id {
    description = "VPC id"
    type = number
}

variable vpc_private_subnets_cidr_blocks {
    description = "VPC private subnets"
    type = list
}

variable vpc_public_subnets {
    description = "VPC public subnets" 
    type = list
}

variable vpc_private_subnets {
    description = "VPC private subnets"
    type = list
}