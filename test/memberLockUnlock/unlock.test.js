const members = require("../../collections/members");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const addContext = require('mochawesome/addContext');
const constants = require("../../config/constants");

describe('Member lock test case', () => {
    it('POST /member/unlock', function (done) {
        const param = { "id": 0 }
        members.unlock(param)
            .end((err, res) => {
                if (res.statusCode !== 200) {
                    logs.getApiResponse(res);
                }

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toBeEqual(res.body.message, constants.UNLOCK);

                console.log("Member unlock message: ", [res.body.message]);
                addContext(this, "Member unlock message: " + [res.body.message]);
                done();
            });
    });
});
