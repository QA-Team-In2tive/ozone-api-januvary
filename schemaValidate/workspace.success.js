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
        "created_by_id": {
          "type": "integer"
        }
      },
      "required": [
        "id",
        "name",
        "created_by_id"
      ]
    }
  ]
}