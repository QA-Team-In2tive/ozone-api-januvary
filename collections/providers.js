const requests = require("../utility/requests");
const config = require("../config/config");
const api = require('../config/api');
const common = require("../utility/common");
const param = require("../paramaters/param");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the all the API's in provider modules
 * Get list
 * Get types 
 * Get access type
 * Get regions
 * Post create 
 * Get credentails
 * Put edit
 * Get allproviders
 * Post providerworkspace
 * Delete providerworkspace
 * Post sync
 * Get worker
 * Get logging
 */
class Providers {
    /**
     * define for the get providers API
     * @param {*} query 
     * @returns 
     */
    get(query) {
        const url = config.prefix + api.provider + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get provider types 
     * @param {*} query 
     * @returns 
     */
    types(query) {
        const url = config.prefix + api.type + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get provider access type
     * @param {*} query 
     * @returns 
     */
    accessType(query) {
        const url = config.prefix + api.accessType + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get provider regions
     * @param {*} query 
     * @returns 
     */
    region(query) {
        const url = config.prefix + api.regions + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the create provider 
     * @returns 
     */
    create() {
        const url = config.prefix + api.provider;

        return requests.sendPOSTRequest(url, param.createProvider())
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get credentials in create provider
     * @param {*} query 
     * @returns 
     */
    getCredentials(query) {
        const url = config.prefix + api.credentials + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the edit provider name and somethink
     * @param {*} query 
     * @returns 
     */
    edit(query) {
        const url = config.prefix + api.provider + query;

        return requests.sendPUTRequest(url, param.edit())
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get all provider list in add to workspace
     * @param {*} query 
     * @returns 
     */
    allproviders(query) {
        const url = config.prefix + api.allproviders + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the add already create provider in provider listing page
     * @returns 
     */
    providerWorkspace() {
        const url = config.prefix + api.providerWorkspace;

        return requests.sendPOSTRequest(url, param.providerWorkspace())
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the delete provider in the provider list page only
     * @returns 
     */
    deleteWorkspace() {
        const url = config.prefix + api.providerWorkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the sync privder
     * @returns 
     */
    sync() {
        const url = config.prefix + api.sync;

        return requests.sendPOSTRequest(url, param.sync())
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get worker list in sync provider
     * @param {*} query 
     * @returns 
     */
    worker(query) {
        const url = config.prefix + api.worker + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for the get logs from in the provideru after syncing done 
     * @param {*} query 
     * @returns 
     */
    logging(query) {
        const url = config.prefix + api.logging + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    orgs(query) {
        const url = config.prefix + api.orgs + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

}

module.exports = new Providers();