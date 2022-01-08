const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the role set or not in ozone panel
 * Get role details
 */
class Role {
    /**
     * define for the get login role details
     * @param {*} query 
     * @returns 
     */
    get(query) {
        const url = config.prefix + api.role + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    post(param) {
        const url = config.prefix + api.role;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    put(param, query) {
        const url = config.prefix + api.role + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    getPermission(query) {
        const url = config.prefix + api.permissions + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    clone(param) {
        const url = config.prefix + api.roleclone;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new Role();