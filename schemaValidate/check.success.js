module.exports = {
    "type": "object",
    "properties": {
        "username": {
            "type": "string"
        },
        "id": {
            "type": "integer"
        },
        "token": {
            "type": "string"
        },
        "email_verified": {
            "type": "boolean"
        }
    },
    "required": [
        "username",
        "id",
        "token",
        "email_verified"
    ]
}