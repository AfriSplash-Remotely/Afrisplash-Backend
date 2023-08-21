output "deploy_vpc_id" {
  description = "VPC of deployment application"
  value       = module.deploy_vpc.id
}

output "backend_repository_arn" {
  description = "ARN of the backend image"
  value       = module.image_upload_ecr.repository_arn
}

output "backend_repository_id" {
  description = "Id of the backend repository"
  value       = module.image_upload_ecr.repository_registry_id
}

output "backend_repository_url" {
  description = "Repository URL of the backend repository"
  value       = module.image_upload_ecr.repository_url
}

output "backend_image_url" {
  description = "Image URL for backend"
  value       = module.image_upload_ecr.ecr_image_url
}