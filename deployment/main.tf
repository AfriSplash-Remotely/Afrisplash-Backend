module "deploy_vpc" {
  source   = "./modules/new_vpc"
  vpc_name = "application-deployment-VPC"
}

module "image_upload_ecr" {
  source        = "./modules/image_upload_ecr"
  ecr_name      = "application-backend-image-repository"
  major_version = 1
  dockerfile_dir = "../."
}