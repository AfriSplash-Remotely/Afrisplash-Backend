## Credentials Needed 
- Get AWS credentials required to authenticate the IAM user following this [guide](https://docs.aws.amazon.com/keyspaces/latest/devguide/access.credentials.html)
- Create an s3 bucket on AWS and note down the bucket name


## Setup Terraform on Local Machine
- After succecfully getting the necessary credentials, change directory into the config folder.
- Create a new file named `backend.hcl` and add the terraform backend credentials as shown in the `backend.hcl.template` and shown below
```
bucket = "[name_of_s3_bucker]"
key="[key_name]"
region="[aws_region]"
```
- Open a terminal in the deployment directory and run the command
```
terraform init -backend-config=config/backend.hcl
```
- Create a new file named `dev.tfvars` and add the aws user credentials to authenticate terraform  as shown in the `dev.tfvars.template` and shown below
```
aws_secret_key="[your_aws_secret_credentials]"
aws_access_key="[your_aws_access_key]"
region="[your_aws_region]"
```

- Run the following command to download and install the local modules

```
terraform get
```


- In the terminal run the following command to see any changes that are required for you infrastructure
```
terraform plan -var-file ./config/dev.tfvars
```

- Run the command below to format terraform files
```
terraform fmt

```
## Architecture Diagram
https://drive.google.com/file/d/18-FlyiWIeEnBhEf-sGsnfcdVI1_fc8QL/view

## Additional Resources 
- https://developer.hashicorp.com/terraform/tutorials/automation/github-actions
- https://codelabs.transcend.io/codelabs/node-terraform/index.html?index=..%2F..index#4
- https://developer.hashicorp.com/terraform/tutorials/modules/module
- https://registry.terraform.io/modules/terraform-aws-modules/ecs/aws/latest
- https://registry.terraform.io/modules/terraform-aws-modules/ecr/aws/latest
- https://developer.hashicorp.com/terraform/tutorials/modules/module


