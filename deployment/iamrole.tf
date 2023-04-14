#   resource "aws_iam_role" "bucket_role" {
#    name = "Bucket Role"
#
#    assume_role_policy = jsonencode({
#        Version = "2012-10-17"
#        Statement = [
#            {
#                Action = "sts:AssumeRole"
#                Effect = "Allow"
#                Sid = ""
#                Principal = {
#                    Service = "ec2.amazonaws.com"
#                }
#            }
#        ]
#    })

#    tags = {
#        tag-key = "tag-value"
#    }
#}

#   resource "aws_ia