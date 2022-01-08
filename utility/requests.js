const supertest = require('supertest');
const config = require('../config/config');

class SendRequest {
    sendGETRequest(apiEndPoint) {
        try {
            let res = supertest(config.baseUrl).get(apiEndPoint).retry(2)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json');

            return res;
        } catch (err) {
            console.log('Error in sending GET Request: ', err);
        }
    }

    sendPOSTRequest(apiEndPoint, requestBody) {
        try {
            let res = supertest(config.baseUrl).post(apiEndPoint).retry(2)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(requestBody);
            return res;
        } catch (err) {
            console.log('Error in sending POST Request: ', err);
        }
    }

    sendPUTRequest(apiEndPoint, requestBody) {
        try {
            let res = supertest(config.baseUrl).put(apiEndPoint).retry(2)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(requestBody);

            return res;
        } catch (err) {
            console.log('Error in sending PUT Request: ', err);
        }
    }

    sendDELETERequest(apiEndPoint) {
        try {
            let res = supertest(config.baseUrl).delete(apiEndPoint).retry(2)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json');

            return res;
        } catch (err) {
            console.log('Error in sending DELETE Request: ', err);
        }
    }

    webhookPOSTRequest(apiEndPoint, requestBody) {
        try {
            let res = supertest(config.baseUrl).post(apiEndPoint).retry(2)
                .send(requestBody);

            return res;
        } catch (err) {
            console.log('Error in sending Webhook POST Request: ', err);
        }
    }

    POSTRequest(baseUrl, apiEndPoint) {
        try {
            let res = supertest(baseUrl).post(apiEndPoint).retry(2)

            return res;
        } catch (err) {
            console.log('Error in sending github pulls POST Request: ', err);
        }
    }
}

module.exports = new SendRequest();