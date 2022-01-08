const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the registry api in ozone panel
 * Registry API's
 */
class Registry {
    /**
     * define for the create registry
     * @param {*} param 
     * @returns 
     */
    create(param) {
        const url = config.prefix + api.registry;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    harborprojectlist(query) {
        const url = config.prefix + api.harborprojectlist + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deleteRegistryWorkspace() {
        const url = config.prefix + api.registryworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    allregistries(query) {
        const url = config.prefix + api.allregistries + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postRegistryWorkspace(param) {
        const url = config.prefix + api.registryworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new Registry();