const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the member set or not in ozone panel
 * Get member details
 */
class Member {
    /**
     * define for the get login member details
     * @param {*} query 
     * @returns 
     */
    get(query) {
        const url = config.prefix + api.member + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    post(param) {
        const url = config.prefix + api.member;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    put(param, query) {
        const url = config.prefix + api.member + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deleteMemberWorkspace() {
        const url = config.prefix + api.memberworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postMemberWorkspace(param) {
        const url = config.prefix + api.memberworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    allmembers(query) {
        const url = config.prefix + api.allmembers + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    lock(param) {
        const url = config.prefix + api.lock;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    unlock(param) {
        const url = config.prefix + api.unlock;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new Member();