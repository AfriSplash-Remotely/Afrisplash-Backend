resource "aws_api_gateway_rest_api" "pre_signed_url_api" {
  name = "signed-url-api"
}

resource "aws_api_gateway_resource" "pre_signed_url_resource" {
  rest_api_id = aws_api_gateway_rest_api.pre_signed_url_api.id
  parent_id   = aws_api_gateway_rest_api.pre_signed_url_api.root_resource_id
  path_part   = var.put_signedUrl_endpoint_path
}

resource "aws_api_gateway_method" "put_signed_url" {
  rest_api_id   = aws_api_gateway_rest_api.pre_signed_url_api.id
  resource_id   = aws_api_gateway_resource.pre_signed_url_resource.id
  http_method   = "PUT"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = aws_api_gateway_rest_api.pre_signed_url_api.id
  resource_id             = aws_api_gateway_resource.pre_signed_url_resource.id
  http_method             = aws_api_gateway_method.put_signed_url.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.pre_signed_url.invoke_arn
}


resource "aws_api_gateway_resource" "get_signed_url_resource" {
  rest_api_id = aws_api_gateway_rest_api.pre_signed_url_api.id
  parent_id   = aws_api_gateway_rest_api.pre_signed_url_api.root_resource_id
  path_part   = var.get_object_signedUrl_endpoint_path
}


resource "aws_api_gateway_method" "get_signed_url" {
  rest_api_id   = aws_api_gateway_rest_api.pre_signed_url_api.id
  resource_id   = aws_api_gateway_resource.get_signed_url_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integrations" {
  rest_api_id             = aws_api_gateway_rest_api.pre_signed_url_api.id
  resource_id             = aws_api_gateway_resource.get_signed_url_resource.id
  http_method             = aws_api_gateway_method.get_signed_url.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get_signed_url.invoke_arn
}


resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pre_signed_url.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:${aws_api_gateway_rest_api.pre_signed_url_api.id}/*/${aws_api_gateway_method.put_signed_url.http_method}${aws_api_gateway_resource.pre_signed_url_resource.path}"
}


resource "aws_lambda_permission" "get_apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_signed_url.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:${aws_api_gateway_rest_api.pre_signed_url_api.id}/*/${aws_api_gateway_method.get_signed_url.http_method}${aws_api_gateway_resource.get_signed_url_resource.path}"
}

resource "aws_api_gateway_deployment" "get_signed_url" {
  rest_api_id = aws_api_gateway_rest_api.pre_signed_url_api.id
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.pre_signed_url_api.body))
  }
  lifecycle {
    create_before_destroy = true
  }
  depends_on = [aws_api_gateway_method.get_signed_url, aws_api_gateway_integration.integrations]
}

resource "aws_api_gateway_stage" "get_signed_url" {
  deployment_id = aws_api_gateway_deployment.get_signed_url.id
  rest_api_id   = aws_api_gateway_rest_api.pre_signed_url_api.id
  stage_name    = "dev"
}

resource "aws_api_gateway_deployment" "pre_signed_url" {
  rest_api_id = aws_api_gateway_rest_api.pre_signed_url_api.id
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.pre_signed_url_api.body))
  }
  lifecycle {
    create_before_destroy = true
  }
  depends_on = [aws_api_gateway_method.put_signed_url, aws_api_gateway_integration.integration]
}

resource "aws_api_gateway_stage" "pre_signed_url" {
  deployment_id = aws_api_gateway_deployment.pre_signed_url.id
  rest_api_id   = aws_api_gateway_rest_api.pre_signed_url_api.id
  stage_name    = "prod"
}