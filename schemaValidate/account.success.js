module.exports = {
    "title": "account name schema",
    "type": "array",
    "items": [
        {
            "type": "object",

            "properties": {
                "provider_name": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "login_url": {
                    "type": "string"
                }
            },
            "required": [
                "provider_name",
                "id",
                "login_url"
            ],
        }
    ]
}

