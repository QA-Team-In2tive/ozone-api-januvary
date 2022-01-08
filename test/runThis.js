require('../test/login.test');

//Cloud providers
require('../test/providers/cloud/aws.test');
require('../test/providers/cloud/gcp.test');
require('../test/providers/cloud/azure.test');

//Container registry providers
require('../test/providers/container/ecr.test');
require('../test/providers/container/gcr.test');
require('../test/providers/container/acr.test');

require('../test/providers/containerOrchestration/awsEKS.test');
require('../test/providers/containerOrchestration/googleGKE.test');
require('../test/providers/containerOrchestration/auzreAKS.test');

//Source code providers
require('../test/providers/sourceCode/github.test');
require('../test/providers/sourceCode/bitbucket.test');
require('../test/providers/sourceCode/gitlab.test');

//Security providers
require('../test/providers/security/snyk.test');
require('../test/providers/security/sonarqube.test');

//Issue trackers
require('../test/providers/issueTrackers/jira.test');

//Private helm channel
require('../test/providers/privateCatalog/privateHelmChannel.test');

require("../test/repositories/bitbucket.test");
require("../test/repositories/github.test");
require("../test/repositories/gitlab.test");

require('../test/registries/amazonWebService.test');
require('../test/registries/googleCloudPlatform.test');
require('../test/registries/azureCloud.test');
require('../test/registries/ecr.test');
require('../test/registries/gcr.test');
require('../test/registries/acr.test');

require('../test/pipelineAndTasks/pipelines/pipeline.test');
require('../test/pipelineAndTasks/tasks/task.test');

require('../test/deploymentConfig/env/env.test');
require('../test/deploymentConfig/helmChannels/helmchannel.test');
require('../test/deploymentConfig/variables/variable.test');
require('../test/deploymentConfig/webhook/webhook.test');

require('../test/governance/members/member.test');
require('../test/governance/roles/role.test');
// require('../test/governance/projects/project.test');
// require('../test/governance/ldapGroup/ldapgroup.test');


