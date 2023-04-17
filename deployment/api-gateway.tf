resource "aws_apigatewayv2_api" "s3upload" {
  name          = "s3upload"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "v1" {
  api_id      = aws_apigatewayv2_api.s3upload.id
  name        = "v1"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "s3upload" {
  api_id           = aws_apigatewayv2_api.s3upload.id
  integration_type = "AWS_PROXY"  connection_type           = "INTERNET"
  description               = "s3upload presign url"
  integration_method        = "POST"
  integration_uri = aws_lambda_function.s3-presigned-url.invoke_arn
}

resource "aws_apigatewayv2_route" "s3upload" {
  api_id    = aws_apigatewayv2_api.s3upload.id
  operation_name = "s3upload"
  route_key      = "GET /url"
  target="integrations/${aws_apigatewayv2_integration.s3upload.id}"
}