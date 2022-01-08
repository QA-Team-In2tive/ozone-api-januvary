module.exports = {
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "created_at": {
                    "type": "string"
                },
                "updated_at": {
                    "type": "string"
                },
                "deleted_at": {
                    "type": "null"
                },
                "name": {
                    "type": "string"
                },
                "sub_category_id": {
                    "type": "integer"
                },
                "enabled": {
                    "type": "boolean"
                },
                "helper_info": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "created_at",
                "updated_at",
                "deleted_at",
                "name",
                "sub_category_id",
                "enabled",
                "helper_info"
            ]
        }
    ],
    "minItems": 1,
    "additionalItems": false
}
