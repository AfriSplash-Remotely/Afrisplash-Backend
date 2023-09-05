output "id" {
  description = "The id of the VPC for application deployment"
  value = module.new_vpc.vpc_id
}

output "private_subnets_cidr_blocks" {
  description = "Private Subnet Cidr block"
  value = module.new_vpc.private_subnets_cidr_blocks
}

output "public_subnets" {
  description = "Public subnets"
  value = module.new_vpc.public_subnets
}

output "private_subnets" {
  description = "Private subnets"
  value = module.new_vpc.private_subnets
}