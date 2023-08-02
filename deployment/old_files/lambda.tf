#resource "random_pet" "lambda_bucket_name" {
#  prefix = "learn-terraform-functions"
#  length = 4
#}
#
#resource "aws_s3_bucket" "lambda_bucket" {
#  bucket = random_pet.lambda_bucket_name.id
#}

#resource "aws_s3_bucket_acl" "bucket_acl" {
#  bucket = aws_s3_bucket.lambda_bucket.id
#  acl    = "private"
#}#

#data "aws_iam_policy_document" "assume_role" {
#  statement {
#    effect = "Allow"
#
#    principals {
 #     type      #  = "Service"
 #     identifiers = ["lambda.#amazonaws.com"]
  #  }
#
#    actions = ["sts:AssumeRole"]
 # }#
#}

#data "aws_iam_policy_document" "bucket_get_put_policy" {
#  statement {
#    actions = [
#      "s3:GetObject",
#      "s3:PutObject",
#      "s3:*",
#      "s3-object-lambda:*"
#    ]
#    effect = "Allow"
#    resources = ["arn:aws:s3:::*"]
#  }
#}
#
#resource "aws_iam_role" "iam_for_lambda" {
#  name               = "iam_for_lambda"
#  assume_role_policy = data.aws_iam_policy_document.assume_role.json
#}
#
#resource "aws_iam_policy" "s3_bucket_policy" {
#  name        = "bucket-policy"
#  description = "s3 policy"
#  policy      = data.aws_iam_policy_document.bucket_get_put_policy.json
}

#resource "aws_iam_role_policy_attachment" "pre_signed_url-attach" {
#  role       = aws_iam_role.iam_for_lambda.name
#  policy_arn = aws_iam_policy.s3_bucket_policy.arn
#}
#
#data "archive_file" "lambda" {
#  type        = "zip"
#  source_dir = "${path.module}/source"
#  output_path = "${path.module}/signedUrl.zip"
#  depends_on = [null_resource.main]
#}

#resource "null_resource" "main" {
#  triggers = {
#    updated_at = timestamp()
#  }
#
#  provisioner "local-exec" {
#    command = <<EOF
#    yarn
#    EOF
#
#    working_dir = "${path.module}/source"
#  }
#}
#
#resource "aws_s3_object" "lambda_hello_world" {
#  bucket = aws_s3_bucket.lambda_bucket.id
#  key    = "hello-world.zip"
#  source = data.archive_file.lambda.output_path
#  #etag = filemd5(data.archive_file.lambda.output_path)
#}
#
#
#resource "aws_s3_object" "get_signed_url_object" {
#  bucket = aws_s3_bucket.lambda_bucket.id
#  key    = "get-signed-url.zip"
#  source = data.archive_file.lambda.output_path
#  #etag = filemd5(data.archive_file.lambda.output_path)
#}
#
#resource "aws_lambda_function" "pre_signed_url" {
#  function_name = "generate-preSigned-Url"
#  s3_bucket = aws_s3_bucket.lambda_bucket.id
#  s3_key = aws_s3_object.lambda_hello_world.key
#  runtime = "nodejs16.x"
#  role          = aws_iam_role.iam_for_lambda.arn
#  handler       = "signedUrl.handler"
#  source_code_hash = data.archive_file.lambda.output_base64sha256
#  environment {
#    variables = {
#        access_key = var.aws_access_key 
#        secret_key = var.aws_secret_key
#        s3_bucket = aws_s3_bucket.frontend_image_bucket.id
#        region = var.region
#    }
#  }
#}
#
#resource "aws_lambda_function" "get_signed_url" {
#  function_name = "get-object-preSigned-Url"
#  s3_bucket = aws_s3_bucket.lambda_bucket.id
#  s3_key = aws_s3_object.get_signed_url_object.key
#  runtime = "nodejs16.x"
#  role          = aws_iam_role.iam_for_lambda.arn
#  handler       = "getSignedUrl.handler"
#  source_code_hash = data.archive_file.lambda.output_base64sha256
#  environment {
#    variables = {
#        access_key = var.aws_access_key 
#        secret_key = var.aws_secret_key
#        s3_bucket = aws_s3_bucket.frontend_image_bucket.id
#        region = var.region
#    }
#  }
#}
#
#resource "aws_cloudwatch_log_group" "hello_world" {
#  name = "/aws/lambda/${aws_lambda_function.pre_signed_url.function_name}"
#
#  retention_in_days = 30
#}
