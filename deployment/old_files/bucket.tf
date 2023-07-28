#resource "random_pet" "frontend_image_bucket_name" {
#  prefix = "afri"
#  length = 3
#}

#resource "aws_s3_bucket" "frontend_image_bucket" {
#  bucket = random_pet.frontend_image_bucket_name.id
#  tags = {
#    Name = " Frontend Image Bucket"
#    Environment : "Prod"
#  }
#}
