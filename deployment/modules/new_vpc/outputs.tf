output "id" {
  description = "The id of the VPC for application deployment"
  value = module.new_vpc.vpc_id
}