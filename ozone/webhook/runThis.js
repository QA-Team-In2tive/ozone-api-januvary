require('../../test/login.test.js');

//Custom app, generic pipeline and release creation 
require('../../test/registries/acr.test');
require('../../test/app/customapp.test');
require('../../test/app/release.test');
require('../../test/webhook/generic-pipeline.test');
require('../../test/webhook/generic-release.test');

require('../../test/registries/acr.test');
require('../../test/app/github-customapp.test');
require('../../test/webhook/github-pull.test');
require('../../test/webhook/github-pull-request.test');
require('../../test/webhook/github-push.test');

require('../../test/registries/acr.test');
require('../../test/app/bitbucket-customapp.test');
require('../../test/webhook/bitbucket-push.test');
require('../../test/webhook/bitbucket-pull.test');

require('../../test/registries/acr.test');
require('../../test/app/gitlab-customapp.test');
require('../../test/linkPipelines/gitlabci.test');
require('../../test/webhook/gitlab-push.test');
require('../../test/webhook/gitlab-pull.test');

