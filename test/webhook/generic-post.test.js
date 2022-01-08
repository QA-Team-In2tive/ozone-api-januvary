const webhook = require("../../collections/webhook");
const common = require("../../utility/common");
const elementHandler = require("../../utility/elementHandler");
const logs = require("../../utility/logs");
const addContext = require("mochawesome/addContext");
const param = require("../../paramaters/param");
const constants = require("../../config/constants");
const config = require("../../config/config");

describe('Webhook generic post request test case', () => {
    it("GET /webhooks", function (done) {
        const id = common.searchOfEnv("webhook", "webhook_creation", "id");

        webhook.get("/" + id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                if (id === res.body.id) {
                    let id = res.body.example.url.split("POST request to : " + config.baseUrl + "/api/webhooks");
                    common.readOrWriteJsonFile("webhook", "webhook_creation", "post_request", id[1]);

                    console.log("Webhook post request url: ", id[1]);
                    addContext(this, "Webhook post request url: " + id[1]);
                }
                done();
            });
    });

    it("POST /request to", function (done) {
        const url = common.searchOfEnv("webhook", "webhook_creation", "post_request");

        webhook.webhookRequest(url, param.overrideParam())
            .end((err, res) => {

                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                console.log("Reponse: ", res.body.message);
                addContext(this, "Webhook post request url response: " + res.body.message);
                done();
            });
    });
});