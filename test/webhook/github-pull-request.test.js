const { Octokit } = require("@octokit/core");

let number = 0;
describe("Github pull test case", function () {
    it("Auth request", async () => {
        const octokit = new Octokit({
            auth: process.env.token_github,
            baseUrl: "https://api.github.com",
        });

        const response = await octokit.request("/user");
    });

    it("create pull request", async () => {
        const octokit = new Octokit({
            auth: process.env.token_github,
            baseUrl: "https://api.github.com",
        });

        const response = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
            owner: "QaIn2tive",
            repo: "github-hello-world",
            head: "v1",
            base: "master",
            title: "testing"
        });

        number = response.data.number;
    });

    it("close pull request", async () => {
        const octokit = new Octokit({
            auth: process.env.token_github,
            baseUrl: "https://api.github.com",
        });

        await octokit.request("PATCH /repos/{owner}/{repo}/pulls/{pull_number}", {
            owner: "QaIn2tive",
            repo: "github-hello-world",
            pull_number: number,
            title: "new title",
            body: "updated body",
            state: "closed"
        })
    });
});