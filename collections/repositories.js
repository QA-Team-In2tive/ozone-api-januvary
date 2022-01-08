const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv("login", "login", "token");
const id = common.searchOfEnv("login", "workspace", "id");

/**
 * This class define for the repository api in ozone panel
 * Registry API's
 */
class Repository {
    /**
     * define for the create repository
     * @param {*} param 
     * @returns 
     */
    create() {
        const url = config.prefix + api.repository;

        return requests.sendPOSTRequest(url)
            .set("Authorization", token)
            .set("x-workspace-id", id)
    }

    get(query) {
        const url = config.prefix + api.repository + query;

        return requests.sendGETRequest(url)
            .set("Authorization", token)
            .set("x-workspace-id", id)
    }

    deleteRepositoryWorkspace() {
        const url = config.prefix + api.repositoryworkspace;

        return requests.sendDELETERequest(url)
            .set("Authorization", token)
            .set("x-workspace-id", id)
    }

    allrepositories(query) {
        const url = config.prefix + api.allrepositories + query;

        return requests.sendGETRequest(url)
            .set("Authorization", token)
            .set("x-workspace-id", id)
    }

    postRepositoryWorkspace(param) {
        const url = config.prefix + api.repositoryworkspace;

        return requests.sendPOSTRequest(url, param)
            .set("Authorization", token)
            .set("x-workspace-id", id)
    }
}

module.exports = new Repository();