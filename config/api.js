module.exports = {
    accountName: '/accounts/oauth',
    login: '/api/auth/login',
    ldap: '/api/auth/login/ldap',
    workspace: '/defaultproject',
    check: '/auth/check',
    logout: '/auth/logout',
    gsuite_link: 'https://accounts.google.com/o/oauth2/auth?client_id=928711504287-93fst3lb9m3okqirkgk3ebmg7gio3dun.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fozone-dev.in2tive.xyz%2Fapi%2Foauth%2Fgoogle%2Fcallback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=evqgkvrAn9aJHnoiXfbHst9LJI1I43b5CzzdWsGK%2Bhj5y9nAVgwaQXBki7Z5OlEB',

    //Provider API's
    provider: '/provider',
    type: '/provider/types',
    accessType: '/provider/access_types',
    regions: '/provider/regions',
    allproviders: '/provider/allproviders',
    providerWorkspace: '/provider/providerworkspace',
    sync: '/provider/sync',
    credentials: '/provider/credentials',
    worker: '/worker_requests',
    logging: '/logging?id=',
    orgs: '/repo/orgs',

    //Application API's
    appTypes: '/app/apps_types',
    registries: '/registry',
    deploy: '/app/deploy_types',
    repositories: '/repository',
    buildTypes: '/app/build_types',
    envs: '/env',
    k8: '/app/k8servicetypes',
    app: '/app',
    appworkspace: '/app/appworkspace',
    allapps: "/app/allapps",

    //pipeline API's
    appenv: '/app/env',
    apptemplates: '/app/templates',
    branches: '/repository/branches',
    cluster: '/cluster',
    newdeploy: '/app/newdeploy',
    tags: '/registry/tags',
    runs: '/app/runs',
    pipelineruns: '/pipelineruns',

    //registry API's
    registry: '/registry',
    harborprojectlist: '/helm/harborprojectlist',
    registryworkspace: '/registry/registryworkspace',
    allregistries: '/registry/allregistries',

    //repositories API's
    repository: '/repository',
    repositoryworkspace: "/repository/repositoryworkspace",
    allrepositories: "/repository/allrepositories",

    //cluster API's
    // cluster: '/cluster'
    nodeType: '/provider/nodetype',
    clusterworkspace: '/cluster/clusterworkspace',
    allclusters: '/cluster/allclusters',
    attach: '/cluster/attach',
    clustertype: '/cluster/types',
    namespaces: '/kube/dynamicresources/namespaces',
    dynamicresources: '/kube/dynamicresources',

    //webhook API's
    whtypes: '/webhooks/types',
    whactiontypes: '/webhooks/actiontypes',
    triggertype: '/webhooks/apptypes',
    pipelines: '/app/pipelines',
    webhooks: '/webhooks',
    incoming: '/webhooks/incomings',
    pipelinerun: '/app/pipelineruns',
    githubeventtypes: '/webhooks/githubeventtypes',
    gitlabeventtypes: '/webhooks/gitlabeventtypes',
    bitbucketeventtypes: '/webhooks/bitbucketeventtypes',
    projects: '/jira/projects',
    webhookworkspace: '/webhooks/webhookworkspace',
    allwebhooks: '/webhooks/allwebhooks',

    //release custom app
    releasestaptype: '/app/releasesteptypes',
    release: '/app/releases',

    //Helm app
    catalog: '/catalog',
    appclusters: '/app/clusters',
    // namespaces: '/kube/dynamicresources/namespaces',
    chart: '/helm/chartversions',
    helmreleases: "/app/helm_releases",

    //Deployment config API's
    //Env API's
    env: '/env',
    envworkspace: '/env/envworkspace',
    envtypes: '/env/types',
    allenvs: '/env/allenvs',

    //Variable API's
    variable: '/variables',
    allvariables: '/variables/allvariables',
    variableworkspace: '/variables/variablesworkspace',

    //Helmchannel API's
    helmchannels: '/helmchannels',
    channelsync: '/provider/sync_resource',

    //Pipelines and tasks API's
    pipeline: '/pipelines',
    pipelineclone: '/pipelines/clone',
    pipelinesworkspace: '/pipelines/pipelinesworkspace',
    allpipelines: '/pipelines/allpipelines',
    templates: '/templates',
    templatestypes: '/templates/types',
    paramtypes: '/pipelines/paramtypes',
    format: '/templates/format',
    templatesworkspace: "/templates/templatesworkspace",
    alltemplates: "/templates/alltemplates",

    //Governance API's 
    //Members API's
    member: '/member',
    allmembers: '/member/allmembers',
    memberworkspace: '/member/memberworkspace',
    lock: '/member/lock',
    unlock: '/member/unlock',
    //Roles API's
    role: '/role',
    permissions: '/role/permissions',
    roleclone: '/role/clone',
    //Project API's
    project: '/project',
    //LdapGroup
    groups: '/ldap_groups/groups',
    ldap_groups: '/ldap_groups'
}