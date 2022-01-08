module.exports = {
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "role_arn": {
                    "type": "null"
                },
                "role_credentials": {
                    "type": "object",
                    "properties": {
                        "cloud_account_id": {
                            "type": "string"
                        },
                        "access_key": {
                            "type": "string"
                        },
                        "secret_key": {
                            "type": "string"
                        },
                        "default_region": {
                            "type": "string"
                        },
                        "default_region_id": {
                            "type": "integer"
                        }
                    },
                    "required": [
                        "cloud_account_id",
                        "access_key",
                        "secret_key",
                        "default_region",
                        "default_region_id"
                    ]
                },
                "json_key": {
                    "type": "null"
                },
                "service_principle": {
                    "type": "null"
                },
                "bitbucket_config": {
                    "type": "null"
                },
                "github_config": {
                    "type": "null"
                },
                "gitlab_config": {
                    "type": "null"
                },
                "azure_token_config": {
                    "type": "null"
                }
            },
            "required": [
                "id",
                "role_arn",
                "role_credentials",
                "json_key",
                "service_principle",
                "bitbucket_config",
                "github_config",
                "gitlab_config",
                "azure_token_config"
            ]
        }
    ],
    "minItems": 1,
    "additionalItems": false
}