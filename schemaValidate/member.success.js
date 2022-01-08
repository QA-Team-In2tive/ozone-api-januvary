module.exports = {
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "admin": {
                    "type": "boolean"
                }
            },
            "required": [
                "id",
                "name",
                "admin"
            ]
        }
    ]
}