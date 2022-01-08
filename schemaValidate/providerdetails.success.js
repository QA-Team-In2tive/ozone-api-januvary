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
            "type": ["null", "string"]
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
        "workspaces": {
            "type": "object",
            "properties": {
                "items": {
                    "type": "array",
                    "items": [
                        {
                            "type": "integer"
                        }
                    ],
                    "minItems": 1,
                    "additionalItems": false
                }
            },
            "required": [
                "items"
            ]
        },
        "default_region": {
            "type": "string"
        },
        "default_region_id": {
            "type": "integer"
        }
    },
    "required": [
        "id",
        "created_at",
        "updated_at",
        "created_by_id",
        "updated_by_id",
        "name",
        "provider_type_id",
        "access_type_id",
        "workspaces",
        "default_region",
        "default_region_id"
    ]
}