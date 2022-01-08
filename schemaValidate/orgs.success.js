module.exports = {
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "is_user": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                },
                "org_img_url": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "is_user",
                "name",
                "org_img_url"
            ]
        },
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "is_user": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                },
                "org_img_url": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "is_user",
                "name",
                "org_img_url"
            ]
        }
    ],
    "minItems": 1,
    "additionalItems": false
}