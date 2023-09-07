module "deploy_vpc" {
  source   = "./modules/new_vpc"
  vpc_name = "application-deployment-VPC"
}

module "image_upload_ecr" {
  source         = "./modules/image_upload_ecr"
  ecr_name       = "application-backend-image-repository"
  major_version  = 1
  dockerfile_dir = "../."
}

module "deploy_ecs" {
  source            = "./modules/ecs"
  backend_image_url = module.image_upload_ecr.ecr_image_url
  cluster_name      = "afrisplash-backend-cluster"
  container_name    = "backend-container"
  container_port    = 80
  alb_name          = "afrisplash-backend-alb"
  alb_sg_name       = "afrisplash-backend-alb-sg"
  vpc_id = module.deploy_vpc.id
  vpc_private_subnets_cidr_blocks = module.deploy_vpc.private_subnets_cidr_blocks
  vpc_public_subnets = module.deploy_vpc.public_subnets
  vpc_private_subnets = module.deploy_vpc.private_subnets
}

