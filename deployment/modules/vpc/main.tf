module "deploy_vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "3.14.2"

  name = var.vpc_name

  cidr = "10.0.0.0/16"
  azs = slice(data.aws_availability_zones.available.names, 0, 2)

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets = ["10.0.4.0/24", "10.0.5.0/24"]

  tags = {
    Terraform = "true"
  }
  
  enable_nat_gateway  = true
  single_nat_gateway  = false
  reuse_nat_ips       = true                    # <= Skip creation of EIPs for the NAT Gateways
  external_nat_ip_ids = "${aws_eip.nat.*.id}"   
}