variable "ecr_name" {
    description = "Name of the ECR"
    type = string
}

variable "major_version" {
    description = "Version number for major change"
    type = number
}

variable "dockerfile_dir" {
    type = string
    description = "The directory that contains the Dockerfile"
}

variable "docker_image_tag" {
  type        = string
  description = "This is the tag which will be used for the image that you created"
  default     = "latest"
}
