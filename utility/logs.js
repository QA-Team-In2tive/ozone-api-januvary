
class Logs {

    /**
     * define for this method use in the GET API reaponse logs showing
     * @param {array} res 
     */
    getApiResponse(res) {
        console.log('-----------------Start Test Case-------------');
        console.log("Headers: ", res.request.header);
        console.log("Method: ", res.request.method);
        console.log("URL: ", res.request.url);
        // console.log("Text: ", res.text);
        console.log("Body: ", res.body);
        console.log("Status Code: ", res.statusCode);
        console.log("Status Message: ", res.res.statusMessage);
        console.log('------------------End Test Case---------------');
    }

    /**
     * define for this method use in the POST API reaponse logs showing
     * @param {array} res 
     */
    postApiResponse(res) {
        console.log('-----------------Start Test Case-------------');
        console.log("Headers: ", res.request.header);
        console.log("Method: ", res.request.method);
        console.log("URL: ", res.request.url);
        console.log("Body param: ", res.request._data);
        console.log("Body: ", res.body);
        console.log("Text: ", res.text);
        console.log("Status Code: ", res.statusCode);
        console.log("Status Message: ", res.res.statusMessage);
        console.log('------------------End Test Case---------------');
    }

    /**
     * define for this method use in the PUT API reaponse logs showing
     * @param {array} res 
     */
    putApiResponse(res) {
        console.log('-----------------Start Test Case-------------');
        console.log("Headers: ", res.request.header);
        console.log("Method: ", res.request.method);
        console.log("URL: ", res.request.url);
        console.log("Body param: ", res.request._data);
        console.log("Body: ", res.body);
        console.log("Text: ", res.text);
        console.log("Status Code: ", res.statusCode);
        console.log("Status Message: ", res.res.statusMessage);
        console.log('------------------End Test Case---------------');
    }
    /**
     * define for this method use in the DELETE API reaponse logs showing
     * @param {array} res 
     */
    deleteApiResponse(res) {
        console.log('-----------------Start Test Case-------------');
        console.log("Headers: ", res.request.header);
        console.log("Method: ", res.request.method);
        console.log("URL: ", res.request.url);
        console.log("Body param: ", res.request._data);
        console.log("Body: ", res.body);
        console.log("Text: ", res.text);
        console.log("Status Code: ", res.statusCode);
        console.log("Status Message: ", res.res.statusMessage);
        console.log('------------------End Test Case---------------');
    }
}

module.exports = new Logs();