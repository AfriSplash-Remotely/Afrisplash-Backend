module "deploy_vpc" {
    source = "./modules/vpc"
    vpc_name = "application-deployemnt-VPC"
}