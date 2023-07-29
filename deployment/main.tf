module "deploy_vpc" {
    source = "./modules/new_vpc"
    vpc_name = "application-deployemnt-VPC"
}