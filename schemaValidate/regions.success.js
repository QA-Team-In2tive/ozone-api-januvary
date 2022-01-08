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
                "provider_type_id": {
                    "type": "integer"
                },
                "region_name": {
                    "type": "string"
                },
                "zone_name": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "created_at",
                "updated_at",
                "deleted_at",
                "provider_type_id",
                "region_name",
                "zone_name"
            ]
        }
    ],
    "minItems": 1,
    "additionalItems": false
}
