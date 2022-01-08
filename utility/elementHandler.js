const chai = require('chai')
chai.use(require('chai-json-schema-ajv'))
const expect = chai.expect
const assert = chai.assert

// TIMEOUT = 10000;

class ElementHandler {
    /**
     * When the target is a string or array, .empty asserts that 
     * the target’s length property is strictly (===) equal to 0.
     * 
     * @param {Array} body 
     * @param {Number} code 
     * @param {Number} value 
     * @param {String} text 
     * @param {String} msg 
     * @param {Boolean} type 
     */
    responseExpect(body, code, value, text, msg, type) {
        expect(body).to.not.be.empty;
        expect(code).to.be.eq(value);
        expect(text).to.eq(msg);
        expect(type).to.be.true;
    }

    /**
     * 
     * @param {Number} code 
     * @param {Number} value 
     * @param {String} text 
     * @param {String} msg 
     * @param {Boolean} type 
     */
    codeAndText(code, value, text, msg, type) {
        expect(code).to.be.eq(value);
        expect(text).to.eq(msg);
        expect(type).to.be.true;
    }

    /**
     * Asserts that the target is strictly (===) equal to the given val.
     * @param {String} value 
     * @param {String} string 
     */
    toBeEqual(value, string) {
        expect(value).to.be.eq(string);
    }

    /**
     * 
     * @param {Object} body 
     * @param {Object} schema 
     */
    schemaValidate(body, schema) {
        expect(body).to.be.jsonSchema(schema, 'invalid schema');
    }

    /**
     * Asserts that the target is strictly (===) equal to true.
     * @param {Boolean} type 
     */
    toBeTrue(type) {
        expect(type).to.be.true;
    }

    /**
     * Asserts that the target string contains the given substring str.
     * @param {String} target 
     * @param {String} substring 
     */
    string(target, substring) {
        expect(target).to.have.string(substring);
    }

    /**
     * Asserts that the target’s type is equal to the given string type
     * 
     * @param {String} str 
     * @param {String} msg _optional_
     */
    toString(str, msg) {
        expect(str, msg).to.be.a('string');
    }

    /**
     * Asserts that the target’s type is equal to the given number type
     * 
     * @param {Number} num 
     * @param {String} msg _optional_
     * 
     */
    toNumber(num, msg) {
        expect(num, msg).to.be.a('number');
    }

    /**
     * Asserts that the target’s type is equal to the given object type
     * 
     * @param {Oject} obj 
     * @param {String} msg _optional_
     */
    toObject(obj, msg) {
        expect(obj, msg).to.be.a('object');
    }

    /**
     * Asserts that the target’s type is equal to the given array type
     * 
     * @param {Array} arr 
     * @param {String} msg _optional_
     */
    toArray(arr, msg) {
        expect(arr, msg).to.be.a('array');
    }

    /**
     * A custom error message can be given as the second argument to expect.
     * @param { Boolean } flag
     * @param { String } msg _optional_
     */
    toBeTrueMsg(flag, msg) {
        expect(flag, msg).to.be.true;

    }

}

module.exports = new ElementHandler();