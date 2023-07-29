resource "aws_eip" "nat" {
  count = 2

  vpc = true
}