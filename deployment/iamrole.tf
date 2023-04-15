# Group Identification
#resource "aws_iam_group" "administrators" {
#  name = "administrators"
#}

#resource "aws_iam_group_policy_attachment" "administrator-attach" {
#  group = "${aws_iam_group.administrators.name}"
#  policy_arn = "arn:aws:iam:aws:policy/AdministratorAccess"
#}

#user https://www.youtube.com/watch?v=r9Itmj0hAno https://www.youtube.com/watch?v=xFzJw6wJ8eY

#resource "aws_iam_user" "admin1" {
#  name = "admin1"
#}


resource "aws_iam_user" "frontend_user" {
  name = "frontend-user"
}

resource "aws_iam_access_key" "frontend_key" {
  user = aws_iam_user.frontend_user.name
}


resource "aws_iam_user_policy" "frontend_user_policy" {
  name = "Frontend_User_Policy"
  user = aws_iam_user.frontend_user.name

  policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Action = [
                        "s3:*"
                    ]
                Effect = "Allow"
                   Resource: [
                       "arn:aws:s3:::afri-frontend-bucket"
                   ]
            }
      ]
      })
}

#   resource "aws_iam_role" "bucket_role" {
#    name = "Bucket Role"
#
#    assume_role_policy = jsonencode({
#        Version = "2012-10-17"
#        Statement = [
#            {
#                Action = [
#                        "s3:*"
#                    ]
#                Effect = "Allow"
 #                   Resource: [
 #                       "arn:aws:s3:::mybucketnam"
 #                   ]
#            }
#        ]
#    })

#    tags = {
#        tag-key = "tag-value"
#    }
#}

#   resource "aws_iam_group_membership" "administrators-users" {
#    name = "administrators-users"

#    users = [
#        "${aws_iam_user.admin1.name}",
#    ]
#    group = "${aws_iam_group.administrators.name}
#   }

#https://www.youtube.com/watch?v=Rx99jg1yVLA