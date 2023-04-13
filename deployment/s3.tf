resource "aws_s3_bucket" "frontend_image_bucket" {
  bucket = "frontend_image_bucket"

  tags = {
    Name = " Frontend Image Bucket"
    Environment : "Prod"

  }
}