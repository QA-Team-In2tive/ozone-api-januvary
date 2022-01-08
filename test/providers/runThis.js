
require('../login.test');

//Cloud providers
require('../providers/cloud/aws.test');
require('../providers/cloud/gcp.test');
require('../providers/cloud/azure.test');

//Container registry providers
require('../providers/container/ecr.test');
require('../providers/container/gcr.test');
require('../providers/container/acr.test');

require('../providers/containerOrchestration/awsEKS.test');
require('../providers/containerOrchestration/googleGKE.test');
require('../providers/containerOrchestration/auzreAKS.test');

//Source code providers
require('../providers/sourceCode/github.test');
require('../providers/sourceCode/bitbucket.test');
require('../providers/sourceCode/gitlab.test');

//Security providers
require('../providers/security/snyk.test');
require('../providers/security/sonarqube.test');

//Issue trackers
require('../providers/issueTrackers/jira.test');

//Private helm channel
require('../providers/privateCatalog/privateHelmChannel.test');

