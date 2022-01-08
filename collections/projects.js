const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the project set or not in ozone panel
 * Get project details
 */
class Project {
    /**
     * define for the get login project details
     * @param {*} query 
     * @returns 
     */
    get(query) {
        const url = config.prefix + api.project + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    post(param) {
        const url = config.prefix + api.project;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    put(param, query) {
        const url = config.prefix + api.project + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new Project();