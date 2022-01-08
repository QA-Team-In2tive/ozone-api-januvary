const common = require("../utility/common");

module.exports = {
    PREFIX: '/api/admin',
    ACCOUNT_ID: 0, //0, 23, 16, 17
    ACCOUNT_NAME: 'demo',

    //API status code and status message
    STATUS_TEXT_OK: 'OK', //200 OK
    STATUS_TEXT_CREATED: 'Created', //201 Created
    STATUS_TEXT_BAD_REQUEST: 'Bad Request', //400 Bad Request
    STATUS_TEXT_UNAUTHORIZED: 'Unauthorized', // 401 Unauthorized
    STATUS_TEXT_PAYMENT: 'Payment', //402 Payment Required,
    STATUS_TEXT_FORBIDDEN: 'Forbidden', //403 Forbidden
    STATUS_TEXT_NOT_FOUND: 'Not Found', //404 Not Found
    STATUS_TEXT_NOT_ALLOWED: 'Not Allowed', //405 Method Not Allowed
    STATUS_TEXT_CONFLICT: 'Conflict', //409 Conflict
    STATUS_TEXT_INTERNAL_SERVER: 'Internal Server Error', //500 Internal Server Error
    STATUS_TEXT_NOT_IMPLEMENTED: 'Not Implemented', //501 Not Implemented
    STATUS_TEXT_BAD_GATEWAY: 'Bad Gateway', //502 Bad Gateway	
    STATUS_TEXT_SERVICE_UNAVAILABLE: 'Service Unavailable', //503 Service Unavailable	
    STATUS_TEXT_GATEWAY_TIMEOUT: 'Timeout',  //504 Gateway Timeout

    STATUS_CODE_200: 200,
    STATUS_CODE_201: 201,
    STATUS_CODE_400: 400,
    STATUS_CODE_401: 401,
    STATUS_CODE_500: 500,
    STATUS_CODE_503: 503,


    // Srting match in assertion
    ACCOUNT: 'Username/Password',
    email_verified: true,
    WORKSPACE: process.env.project == undefined ? 'default' : process.env.project,
    LOGOUT: 'Logged out successfully',
    ACZ_REGI: "acrtester",
    GCP_REGI: "gcr.io",

    //provider types name
    AWS: "Amazon Web Service (AWS)",
    GCP: "Google Cloud Platform (GCP)",
    ACZ: "Azure Cloud (ACZ)",
    BB: "Bitbucket",
    GH: "Github",
    GL: "Gitlab",
    ADO: "Azure DevOps",
    ACR: "Azure Container Registry",
    AKS: "Azure AKS",
    GCR: "Google GCR",
    GKE: "Google GKE",
    GCB: "Google Cloud Build",
    EKS: "AWS EKS",
    ECR: "AWS ECR",
    ACP: "AWS CodePipeline",
    AAD: "Azure AD",
    GS: "Google GSuite",
    SLACK: "Slack",
    SP: "Spinnaker Pipelines",
    JP: "Jenkins Pipeline",
    NR: "New Relic",
    JFROG: "Jfrog Registry",
    LDAP: "Ldap",
    HARBOR: "Harbor Registry",
    DOCKER: "Docker Hub",
    SNYK: "SNYK",
    SONAR: "SONARQUBE",
    JIRA: "JIRA",
    PRIVATE_HELM: "Private Helm Channel",
    QUAY: "Quay",
    MINIO: "MINIO",
    DD:"Datadog",
    ES:"Elastic Search",
    
    //access type in name
    2: 'Credentials',

    //github orgs name
    ORGSGIT: 'QaIn2tive',
    ORGSBIT: 'one_qa',
    ORGSLAB: 'QATeamIn2',
    PROJECTKEY: "OZ",

    //cluster node data value
    NODE_TYPE_AWS: "t2.2xlarge",
    NODE_TYPE_GCP: "e2-standard-2",
    NODE_TYPE_ACZ: "Standard_D2_v3",
    NODE_COUNT: 2,
    MIN_NODE: 2,
    MAX_NODE: 2,

    //Set default region name
    AWS_Region: "eu-west-1",
    GCP_Region: "asia-south1",
    AC_Region: "centralindia",

    //Application create in select repository, registry, build and deploy name.
    CUSTOM_APP: "Custom App",
    DEPLOY_NAME: "Kubernetes",
    SERVICE_TYPE: "NodePort", //NodePort, LoadBalancer, Ingress,
    BUILD_NAME: "Docker",
    REPO_NAME: "In2tive_Hello_World",
    ENV_NAME: process.env.env == undefined ? "dev" : process.env.env,
    DNS: "35.200.158.88",

    //Helm app creation
    HELM_APP: "Helm App",
    NAMESPACE_NAME: "default",
    CATALOG: "jenkins-operator",

    //Helm channels URLs
    // HELM_CHANNEL_URL: "https://charts.helm.sh/stable/",
    HELM_CHANNEL_URL: "https://charts.hesh/incubator/",
    HELM_MSG_SUCCESS: "Helm channel created",
    HELM_MSG: "Helm channel with same URL already exists",

    //Environment
    ENV_TYPE: "Other",

    //generic pipeline webhook creation details
    GENERIC_TYPE_NAME: "Generic",

    //github custom app and webhook creation details
    GITHUB_REPO_NAME: "In2tive_Hello_World",
    GITHUB_TYPE_NAME: "Github",
    GITHUB_BRANCH_NAME: "master",

    //butbucket custom app and webhook creation details
    BIT_REPO_NAME: "bitbucket-hello",
    BIT_TYPE_NAME: "Bitbucket",
    BIT_BRANCH_NAME: "master",

    //gitlab custom app and webhook creation details
    GITLAB_REPO_NAME: "gitlab-hello-world",
    GITLAB_TYPE_NAME: "Gitlab",
    GITLAB_BRANCH_NAME: "master",

    // common webhook creation details
    CLUSTER_NAME: common.searchOfEnv("cluster", "cluster_details", "name"), //"aks-attach2",
    ACTION_TYPE: "Application",
    PIPELINE_APP_TYPE: "Pipeline",
    RELEASE_APP_TYPE: "Release",
    PULL: "Pull Request",
    PUSH: "Push Branch",

    //Jira webhook type creation details
    JIRA_WEBHOOK: "Jira",
    JIRA_ACTION_TYPE: "Jira Approval",
    Resolution_Name: "QA",

    //Link pipeline names
    PYTHON_TEST: "ozone-python-test",
    SONARQUBE_REPO: "ozone-sonarqube-repo-scan",
    GITLAB_CI: "gitlab-ci-trigger",
    CANARY_DEPLOY: "ozone-canary-deploy",
    SNYK_REPO: "ozone-snyk-repo-scan",
    SNYK_CONTAINER: "ozone-snyk-container-scan",
    PYTHON_TEST_REPO_NAME: "in2tive-python-hello-world",

    LINK_SUCCESS: "pipeline added",
    LINK_PIPELINE_MSG: "Pipeline is already linked in application",
    PROJECT_KEY: "ozone",

    //Task type name
    TASK_TYPE: "Tekton Task Template",
    FORMAT: "YAML",

    //Delete from project message
    SUCCESS: "Successful",

    //Member name
    MEMBER_NAME: "admin@ozone.one",
    LOCK: "Member Locked Successfully",
    UNLOCK: "Member UnLocked Successfully",

    //Role permissions name
    ROLE_PER_NAME: "PROVIDER_LIST",
    ROLE_NAME: "Software Developer",
    GITLAB_CI_TOKEN: "a7cf800d7473df0db82fa61f06d3e4",

    CLUSTER_TYPE_ID: 6,
    NAMESPACE_NAME_1: "ozone",
    NAMESPACE_NAME_2: "flux-system",
    NAMESPACE_NAME_3: "tekton-pipelines",
    NAMESPACE_NAME_4: "istio-system",

    POD_STATUS: "Running",
    PIPELINE_TIMEOUT: 0,
    MASTER: "master",
    V1: "v1",
    V2: "v2",

}