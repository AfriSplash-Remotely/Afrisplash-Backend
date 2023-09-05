module "ecs_cluster" {
    source ="terraform-aws-modules/ecs/aws//modules/cluster"
    cluster_name = var.cluster_name
    fargate_capacity_providers = {
    FARGATE = {
        default_capacity_provider_strategy = {
        weight = 50
        base   = 20
        }
    }
    FARGATE_SPOT = {
        default_capacity_provider_strategy = {
        weight = 50
        }
    }
    }

    tags = {
        Name = "Afrisplash"
    }
}