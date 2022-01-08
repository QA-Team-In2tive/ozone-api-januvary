const requests = require("../utility/requests");
const api = require('../config/api');
const param = require('../paramaters/param');
const common = require("../utility/common");
const config = require("../config/config");

/**
 * This class define for login client in ozone panel
 * Get all account name
 * Post login client
 * Get default workspace 
 * Get check login or not
 * Delete logout client
 */
class Login {
    /**
     * define for the get all account name links
     * @param {*} query 
     * @returns 
     */
    accountName(query) {
        const url = config.prefix + api.accountName;

        return requests.sendGETRequest(url + query)
    }

    /**
     * define for login client in the ozone panel
     * @returns 
     */
    login(url) {
        return requests.sendPOSTRequest(url, param.loginParam())
            .set('X-BrowserFingerprint', 'd994f4bfa468673bfaa8d5016716543e')
    }

    /**
     * define for the set workspace of the every login client
     * @param {*} query 
     * @returns 
     */
    workspace(query) {
        const url = config.prefix + api.workspace + query
        const token = common.searchOfEnv('login', 'login', 'token');

        return requests.sendGETRequest(url)
            .set('Authorization', token)
    }

    /**
     * define for the login after check login token or get token is right
     * @returns 
     */
    check() {
        const token = common.searchOfEnv('login', 'login', 'token');
        const url = config.prefix + api.check;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-BrowserFingerprint', 'd994f4bfa468673bfaa8d5016716543e')
    }

    // check() {
    //     const token = common.searchOfEnv('login', 'login', 'token');
    //     const url = "/api"+ api.check;

    //     return requests.sendGETRequest(url)
    //         .set('Authorization', token)
    // }

    /**
     * define for the logout client in the ozone panel
     * @returns 
     */
    logout() {
        const token = common.searchOfEnv('login', 'login', 'token');
        const id = common.searchOfEnv('login', 'workspace', 'id');

        const url = config.prefix + api.logout;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    getLink() {
        return requests.sendGETRequest(api.gsuite_link)
    }
}

module.exports = new Login();