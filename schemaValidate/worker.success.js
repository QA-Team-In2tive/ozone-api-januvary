module.exports = {
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "provider_id": {
                    "type": "string"
                },
                "sync_kinds": {
                    "type": "array",
                    "items": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "string"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "minItems": 1,
                    "additionalItems": false
                },
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
                }
            },
            "required": [
                "provider_id",
                "sync_kinds",
                "id",
                "created_at",
                "updated_at",
                "account_id",
                "created_by_id",
                "updated_by_id"
            ]
        }
    ],
    "minItems": 1,
    "additionalItems": false
}