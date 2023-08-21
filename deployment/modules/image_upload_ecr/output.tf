output "repository_arn" {
  description = "The full ARN of the elastic container registry"
  value = module.ecr.repository_arn
}

output "repository_registry_id" {
  description = "The registry id of the elastic container registry"
  value = module.ecr.repository_registry_id
}

output "repository_url" {
  description = "The url of the elastic container registry"
  value = module.ecr.repository_url
}


output "ecr_image_url" {
  description = "URL to image in ECR with tag"
  value = "${module.ecr.repository_url}:${var.docker_image_tag}"
}