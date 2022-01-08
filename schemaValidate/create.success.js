module.exports = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "created_at": {
            "type": "string"
        },
        "updated_at": {
            "type": "null"
        },
        "account_id": {
            "type": "integer"
        },
        "created_by_id": {
            "type": "integer"
        },
        "updated_by_id": {
            "type": "integer"
        },
        "name": {
            "type": "string"
        },
        "provider_type_id": {
            "type": "integer"
        },
        "access_type_id": {
            "type": "integer"
        },
        "sub_category_id": {
            "type": "integer"
        },
        "workspaces": {
            "type": "object",
            "properties": {
                "items": {
                    "type": "array",
                    "items": [
                        {
                            "type": "integer"
                        }
                    ]
                }
            },
            "required": [
                "items"
            ]
        }
    },
    "required": [
        "id",
        "created_at",
        "updated_at",
        "account_id",
        "created_by_id",
        "updated_by_id",
        "name",
        "provider_type_id",
        "access_type_id",
        "sub_category_id",
        "workspaces"
    ]
}
