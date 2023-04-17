output "image_bucket_domain_name" {
    value       = aws_s3_bucket.frontend_image_bucket.bucket_domain_name
    description = "domain name of bucket"
}

output "frontend_user_name" {
    value = aws_iam_user.frontend_user.name
    description = " User name of Frontend end Aws account"
}

output "frontend_secret_key" {
    value = aws_iam_access_key.frontend_key.secret 
    sensitive = true
}

output "frontend_access_key" {
    value = aws_iam_access_key.frontend_key.id 
}


output "function_name" {
  description = "Name of the Lambda function."
  value = aws_lambda_function.test_lambda.function_name
}


# output "bucket_regional_domain_name" {
#   value       = frontend_image_bucket.bucket_regional_domain_name
#   description = "The bucket region-specific domain name"
# }

# output "bucket_website_domain" {
#   value       = join("", aws_s3_bucket_website_configuration.default.*.website_domain, aws_s3_bucket_website_configuration.redirect.*.website_domain)
#   description = "The bucket website domain, if website is enabled"
# }

# output "bucket_website_endpoint" {
#   value       = join("", aws_s3_bucket_website_configuration.default.*.website_endpoint, aws_s3_bucket_website_configuration.redirect.*.website_endpoint)
#   description = "The bucket website endpoint, if website is enabled"
# }

# output "bucket_id" {
#   value       = frontend_image_bucket.id
#   description = "Bucket Name (aka ID)"
# }

# output "bucket_arn" {
#   value       = frontend_image_bucket.arn
#   description = "Bucket ARN"
# }

# output "bucket_region" {
#    value       = frontend_image_bucket.region
#   description = "Bucket region"
# }

# output "ecr_arn" {
#   value       = ecr_repo.arn
#  description = "ECR arn"
# }

# output "ecr_id" {
#  value       = ecr_repo.id
#  description = "ECR_ID"
# }

# output "ecr_image_tag_mutability" {
#  value       = ecr_repo.image_tag_mutability
#  description = "ECR Image Tab Mutability status"
# }

# output "ecr_name" {
#  value       = ecr_repo.name
#  description = "ECR Name"
# }

#   output "ecr_registory_id {
#       value = ecr_repo.registry_id
#       description = "ECR Registory Id"
#   }

#   output "ecr_repository" {
#   value = ecr_repo.repository_url 
#    description = "ECR repository"
#   }

# output "registry_id" {
#   description = "The account ID of the registry holding the repository."
#   value = ecr_repo.repository.registry_id
# }

# output "repository_url" {
 #   description = "The URL of the repository."
 # value = ecr_repo.repository.repository_url
# }