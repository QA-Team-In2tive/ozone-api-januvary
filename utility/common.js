const fs = require('fs');
const date = new Date().getTime();
const path = require('path');
var crypto = require('crypto');
const YAML = require('json-to-pretty-yaml');
const yaml = require('js-yaml');

const proPath = path.join(path.resolve(), '/resource/environment.json');
const cluster = path.join(path.resolve(), '/resource/cluster.json');

class Utility {
    generateNumber() {
        return Math.floor(10 + Math.random() * 900);
    }

    generateUEN() {
        return `${Math.floor(100000000 + Math.random() * 900000000)}M`;
    }

    getRandomName() {
        let randomNumber = Math.floor((Math.random() * 100) + 1)
        return `name${new Date().getTime().toString()}${randomNumber}`
    }

    getRandomID() {
        let randomNumber = Math.floor((Math.random() * 1000) + 1)
        return `ID_${new Date().getTime().toString()}${randomNumber}`
    }

    getRandomPhoneNumber() {
        return Math.random()
            .toString()
            .slice(2, 11)
    }

    getRandomEmail() {
        return `${new Date().getTime().toString()}${'@email.com'}`

    }

    /**
     * 
     * @param {array} array 
     * @param {string} string 
     * @returns 
     */
    arrayOfStrMetch(array, string) {
        let value = false;
        for (let filter of array) {
            if (filter == string) {
                value = true;
            }
        }
        return value;
    }

    /**
     * 
     * @param {array} array 
     * @param {string} string 
     * @returns 
     */
    getIndexOf(array, string) {
        let index = -1
        for (let filter of array) {
            if (filter == string) {
                index = array.indexOf(string)
            }
        }

        return index;
    }

    /**
     * 
     * @param {array} list 
     * @returns 
     */
    randomList(list) {
        let type = list[Math.floor(Math.random() * list.length)];

        return type;
    }

    /**
     * 
     * @param {number} length 
     * @returns 
     */
    getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }

        return result + date;
    }

    /**
     * 
     * @param {number} length 
     * @returns 
     */
    getSmallCharStr(length) {
        var randomChars = 'abcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }

        return result + date;
    }


    /**
     * 
     * @param {number} length 
     * @returns 
     */
    getAppStr(length) {
        var randomChars = 'abcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }

        return result + date;
    }

    /**
     * 
     * @param {file} path 
     * @param {array} array 
     */
    writeJsonFlie(path, array) {
        let data = JSON.stringify(array);
        fs.writeFileSync(path, data);
    }

    /**
     * 
     * @param {file} path 
     * @returns 
     */
    readJsonFile(path) {
        // read the file into raw data
        var rawdata = fs.readFileSync(path);
        // parse the raw data into meaningful JSON format
        var value = JSON.parse(rawdata);
        return value;
    }

    /**
     * 
     * @param {string} fileName 
     * @param {array} array 
     */
    writeJsonKey(fileName, array) {
        let data = JSON.parse(JSON.stringify(array));
        fs.writeFileSync(fileName, data);
    }

    /**
     * 
     * @param {string} moduleName 
     * @param {string} object 
     * @param {string} variable 
     * @param {number} index 
     * @returns 
     */
    readOrWriteJsonFile(moduleName, object, variable, value) {
        const array = this.readJsonFile(proPath);
        var env = array.Ozone[moduleName][object];

        env[variable] = value;

        this.writeJsonFlie(proPath, array);
    }

    /**
     * 
     * @param {string} moduleName 
     * @param {string} object 
     * @param {string} variable 
     * @returns 
     */
    searchOfEnv(moduleName, object, variable) {
        const value = this.readJsonFile(proPath);
        var result = value.Ozone[moduleName][object][variable];

        return result;
    }

    /**
     * 
     * @param {string} variable 
     * @param {string} value 
     * @returns 
     */
    updateJsonFile(variable, value) {
        const obj = this.readJsonFile(cluster);
        obj[variable] = value;
        this.writeJsonFlie(cluster, obj);
    }

    /**
     * 
     * @param {string} moduleName 
     * @param {string} providerType 
     * @param {number} index 
     * @returns 
     */
    getJsonFile(variable) {
        const obj = this.readJsonFile(cluster);

        return obj[variable];
    }

    md5(string, callback) {
        var withCallback = typeof callback === 'function';

        try {
            var hash = crypto.createHash('md5')
                .update(string)
                .digest('hex');

            withCallback && callback(null, hash);
        } catch (e) {
            if (withCallback) callback(e);
            else throw e;
        }
    }

    promiseMd5(string) {
        return new Promise((resolve, reject) => {
            this.md5(string, (err, hash) => {
                return err ? reject(err) : resolve(hash)
            })
        });
    }

    forOf(res, string) {
        for (const object of res) {
            if (object.name === string) {
                return object;
            }
        }
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    tryDelay(delayMs) {
        var startMs = Date.now();
        var curMs = Date.now();

        while ((startMs + delayMs) > curMs) {
            curMs = Date.now();
        }
    }

    writeYamlFile(data) {
        const yaml_file = path.join(path.resolve(), '/test/attachCluster/attach.yaml');

        let yamlStr = yaml.dump(data);
        fs.writeFileSync(yaml_file, yamlStr, 'utf8');
    }

    readYamlFile() {
        const file = path.join(path.resolve(), '/test/attachCluster/attach.yaml');

        // Get document, or throw exception on error
        try {
            const doc = yaml.load(fs.readFileSync(file, 'utf8'));
            // console.log(doc);

            return doc;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new Utility();