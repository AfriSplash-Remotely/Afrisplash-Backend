resource "aws_eip" "nat" {
  count = 1

  vpc = true
}