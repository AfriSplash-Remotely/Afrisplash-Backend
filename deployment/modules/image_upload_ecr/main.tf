module "ecr" {
    source = "terraform-aws-modules/ecr/aws"

    repository_name = var.ecr_name
    repository_read_write_access_arns = ["arn:aws:iam::012345678901:role/terraform"]
    repository_lifecycle_policy = jsonencode({
    rules = [
      {
        rulePriority = 1,
        description  = "Keep last 10 images",
        selection = {
          tagStatus     = "tagged",
          tagPrefixList = ["v${var.major_version}"],
          countType     = "imageCountMoreThan",
          countNumber   = 10
        },
        action = {
          type = "expire"
        }
      }
    ]
  })

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}


# Checks if build folder has changed
#data "external" "build_dir" {
#  program = ["bash", "${path.module}/bin/dir_md5.sh", var.dockerfile_dir]
#}



# Builds test-service and pushes it into aws_ecr_repository
resource "null_resource" "ecr_image" {
  #triggers = {
   # build_folder_content_md5 = data.external.build_dir.result.md5
  #}

  # Runs the build.sh script which builds the dockerfile and pushes to ecr
  provisioner "local-exec" {
    command = "bash ${path.module}/bin/build.sh ${var.dockerfile_dir} ${module.ecr.repository_url}:${var.docker_image_tag}"
  }
}