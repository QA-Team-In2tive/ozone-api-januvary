module.exports = {
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "data": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "data",
                "status"
            ]
        }
    ],
    "minItems": 1,
    "additionalItems": false
}