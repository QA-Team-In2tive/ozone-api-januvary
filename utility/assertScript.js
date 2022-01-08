const elementHandler = require("./elementHandler");

class Assert {
    /**
     * 
     * @param {number} code 
     * @param {number} value 
     * @param {string} text 
     * @param {string} msg 
     * @param {boolean} type 
     */
    testScript(body, code, value, text, msg, type) {
        elementHandler.responseExpect(body, code, value, text, msg, type);
    }

    testSchema(body, schema) {
        elementHandler.schemaValidate(body, schema);
    }
}

module.exports = new Assert();