const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the deployment config moudle API's
 * 
 */
class DeploymentConfig {

    /**
     * define for get all environments
     * @param {string} query 
     * @returns 
     */
    getEnv(query) {
        const url = config.prefix + api.env + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for create new env 
     * @param {string} param 
     * @returns 
     */
    postEnv(param) {
        const url = config.prefix + api.env;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for update in env record
     * @param {string} param 
     * @returns 
     */
    putEnv(param, query) {
        const url = config.prefix + api.env + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for remove record in evn page
     * @returns 
     */
    deleteWorkspaceEnv() {
        const url = config.prefix + api.envworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for get env types
     * @param {string} query 
     * @returns 
     */
    type(query) {
        const url = config.prefix + api.envtypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for get all existing env 
     * @param {string} query 
     * @returns 
     */
    allEnv(query) {
        const url = config.prefix + api.allenvs + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for add to workspace in project
     * @param {string} param 
     * @returns 
     */
    postWorkspaceEnv(param) {
        const url = config.prefix + api.envworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get helm channels 
     * @param {string} query 
     * @returns 
     */
    getHelmChannels(query) {
        const url = config.prefix + api.helmchannels + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for create new public helm channel
     * @param {string} param 
     * @returns 
     */
    postHelmChannels(param) {
        const url = config.prefix + api.helmchannels;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for update helm channel record
     * @param {string} param 
     * @returns 
     */
    putHelmChannels(param, query) {
        const url = config.prefix + api.helmchannels + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for sync resource in public helm channel
     * @param {string} param 
     * @returns 
     */
    sync(param) {
        const url = config.prefix + api.channelsync;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for get existing variables list
     * @param {string} query 
     * @returns 
     */
    getVariable(query) {
        const url = config.prefix + api.variable + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for create new variable 
     * @param {string} param 
     * @returns 
     */
    postVariable(param) {
        const url = config.prefix + api.variable;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for update variable record
     * @param {string} param 
     * @returns 
     */
    putVariable(param, query) {
        const url = config.prefix + api.variable + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for remove from project in variable
     * @returns 
     */
    deleteWorkspaceVariable() {
        const url = config.prefix + api.variableworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for get all existing variables 
     * @param {string} query 
     * @returns 
     */
    allVariable(query) {
        const url = config.prefix + api.allvariables + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for add to workspace in project
     * @param {string} param 
     * @returns 
     */
    postWorkspaceVariable(param) {
        const url = config.prefix + api.variableworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new DeploymentConfig();