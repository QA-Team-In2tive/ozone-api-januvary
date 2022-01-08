const constants = require("../config/constants");
const common = require("../utility/common");

class Param {
    /**
     * define for account name query param
     * @returns 
     */
    accountQuery() {
        return process.env.account_name;
    }

    /**
     * define for login clinet
     * @returns 
     */
    loginParam() {
        const login = {
            "account_name": process.env.account_name,
            "username": process.env.username,
            "password": process.env.password,
            "provider_type_id": common.searchOfEnv("login", "account_name", "id")
        }

        return login;
    }

    /**
     * define for provider creation
     * @returns 
     */
    createProvider() {
        const create = {
            "provider_type_id": common.searchOfEnv("provider", "provider_type", "id"),
            "access_type_id": common.searchOfEnv("provider", "access_type", "id"),
        }

        return create;
    }

    /**
     * define fo the add form workspace in provider
     * @returns 
     */
    providerWorkspace() {
        const addProvider = {
            "id": common.searchOfEnv("provider", "add_to_workspace", "id")
        }

        return addProvider;
    }

    /**
     * define for the sync provider
     * @returns 
     */
    sync() {
        const sync = {
            "provider_id": common.searchOfEnv("provider", "provider_details", "id")
        }

        return sync;
    }

    /**
     * define for the edit provider details 
     * @returns 
     */
    edit() {
        const edit = {
            "id": common.searchOfEnv("provider", "provider_details", "id"),
            "name": common.getRandomString(8)
        }

        return edit;
    }

    /**
     * define for the remove to workspace provider
     * @returns 
     */
    deleted() {
        const deleted = {
            "id": common.searchOfEnv("provider", "provider_details", "id")
        }

        return deleted;
    }

    /**
     * define for provider creation
     * @returns 
     */
    clusterAWSCreation() {
        const create = {
            'provider_type_id': common.searchOfEnv('cluster', 'provider_type', 'id'),
            'name': 'aws-' + common.getSmallCharStr(2),
            'nodetype': common.searchOfEnv('cluster', 'nodetype', 'id'),
            'region': common.searchOfEnv('cluster', 'region', 'id'),
            "default_ng_name": "node-aws",
            "node_count": 2,
            "min_count": 2,
            "max_count": 2,
            'provider_id': common.searchOfEnv('cluster', 'provider_id', 'id'),
            "vpc_id": null,
            "createVPC": "CreateNew",
            "createSubnet": null,
            "subnet_ids": null,
            "int_gateway_id": null,
            "route_table_id": null,
            "kube_version": "1.19"
        }

        return create;
    }

    clusterGCPCreation() {
        const create = {
            "provider_type_id": common.searchOfEnv('cluster', 'provider_type', 'id'),
            "name": 'gcp-' + common.getSmallCharStr(2),
            "nodetype": common.searchOfEnv('cluster', 'nodetype', 'id'),
            "region": common.searchOfEnv('cluster', 'region', 'id'),
            "default_ng_name": "node-gcp",
            "node_count": 2,
            "min_count": 2,
            "max_count": 2,
            "provider_id": common.searchOfEnv('cluster', 'provider_id', 'id'),
            "vpc_id": null,
            "createVPC": null,
            "createSubnet": null,
            "subnet_ids": null,
            "int_gateway_id": null,
            "route_table_id": null,
            "kube_version": "1.20.9-gke.701",
            "security": []
        }

        return create;
    }

    clusterAzureCreation() {
        const create = {
            "provider_type_id": common.searchOfEnv('cluster', 'provider_type', 'id'),
            "name": 'azure-' + common.getSmallCharStr(2),
            "nodetype": common.searchOfEnv('cluster', 'nodetype', 'id'),
            "region": common.searchOfEnv('cluster', 'region', 'id'),
            "default_ng_name": "node-azure",
            "node_count": 2,
            "min_count": 2,
            "max_count": 2,
            "provider_id": common.searchOfEnv('cluster', 'provider_id', 'id'),
            "vpc_id": null,
            "createVPC": null,
            "createSubnet": null,
            "subnet_ids": null,
            "int_gateway_id": null,
            "route_table_id": null,
            "kube_version": "1.20.9",
            "security": []
        }

        return create;
    }

    updateCluster() {
        const update = {
            "id": common.searchOfEnv("cluster", "cluster_details", "id"),
            "account_id": common.searchOfEnv("cluster", "cluster_details", "account_id"),
            "name": common.searchOfEnv("cluster", "cluster_details", "name"),
            "provider_id": common.searchOfEnv("cluster", "cluster_details", "provider_id"),
            "cluster_type_id": common.searchOfEnv("cluster", "cluster_type", "id"),
            "endpoint": common.searchOfEnv("cluster", "cluster_details", "endpoint"),
            "status": common.searchOfEnv("cluster", "cluster_details", "status"),
            "version": common.searchOfEnv("cluster", "cluster_details", "version"),
            "platform_version": "",
            "region": "",
            "region_id": common.searchOfEnv("cluster", "cluster_details", "region_id"),
            "private": false,
            "node_type": common.searchOfEnv("cluster", "cluster_details", "node_type"),
            "vpc_id": common.searchOfEnv("cluster", "cluster_details", "vpc_id"),
            "subnet_ids": null,
            "cidr_block": "",
            "int_gateway_id": "",
            "route_table_id": "",
            "workspaces": { "items": [common.searchOfEnv("login", "workspace", "id")] },
            "installedResources": {
                "helm": true,
                "logging": { "enabled": true, "logAllNamespace": true },
                "monitoring": true,
                "operator": false,
                "tektonpipelines": true,
                "flaggerworkspaces": false,
                "Istio": false,
                "elk": false,
                "dex": false,
                "contour": false
            },
            "cluster_node_pool": null,
            "tags": null,
            "cluster_security_config": {
                "shielded_nodes": false,
                "binary_auth": false
            },
            "envs": [
                common.searchOfEnv("cluster", "cluster_details", "env_id")
            ],
            "providers": { "items": null },
            "provider_uid": "",
            "auth": { "token": common.searchOfEnv("cluster", "cluster_details", "auth_token") },
            "advanced": false,
            "advanced_cluster_templates_id": "000000000000000000000000",
            "archived": false
        }

        return update;
    }
    
    /**
     * define for the create custom application
     * @returns 
     */
    customApp() {
        const app = {
            "type_id": common.searchOfEnv("app", "custom_app", "app_type_id"),
            "name": "app-" + common.getAppStr(4),
            "custom": {
                "registry_id": common.searchOfEnv("app", "custom_app", "registry_id"),
                "deploy_type_id": common.searchOfEnv("app", "custom_app", "deploy_id"),
                "bootstrapValue": {
                    "namespaceName": constants.NAMESPACE_NAME,
                    "deploymentName": "{{applications.NAME}}-deployment",
                    "deploymentReplica": 2,
                    "serviceTargetPort": 3000,
                    "serviceName": "{{applications.NAME}}-service",
                    "serviceType": common.searchOfEnv("app", "custom_app", "service_type"),
                    "servicePort": 80
                },
                "repository_id": common.searchOfEnv("app", "custom_app", "repository_id"),
                "build_type_id": common.searchOfEnv("app", "custom_app", "build_id"),
                "file_location": "Dockerfile",
            },
            "envs": [common.searchOfEnv("app", "custom_app", "env_id")]
        }

        common.readOrWriteJsonFile("app", "custom_app", "name", app.name);

        return app;
    }

    /**
     * define for the create custom application
     * @returns 
     */
    ingressCustomApp() {
        const app = {
            "type_id": common.searchOfEnv("app", "custom_app", "app_id"),
            "name": "ingress-" + common.getAppStr(2),
            "custom": {
                "registry_id": common.searchOfEnv("app", "custom_app", "registry_id"),
                "deploy_type_id": common.searchOfEnv("app", "custom_app", "deploy_id"),
                "bootstrapValue": {
                    "namespaceName": "default",
                    "deploymentName": "{{applications.NAME}}-deployment",
                    "deploymentReplica": 2,
                    "serviceTargetPort": 3000,
                    "serviceName": "{{applications.NAME}}-service",
                    "serviceType": common.searchOfEnv("app", "custom_app", "service_type"),
                    "servicePort": 80
                },
                "dns": constants.DNS,
                "repository_id": common.searchOfEnv("app", "custom_app", "repository_id"),
                "build_type_id": common.searchOfEnv("app", "custom_app", "build_id"),
                "file_location": "Dockerfile",
            },
            "envs": [common.searchOfEnv("app", "custom_app", "env_id")]
        }

        common.readOrWriteJsonFile("app", "custom_app", "name", app.name);

        return app;
    }

    /**
     * ozone-git-pull-docker-image-build-and-push-pipeline-v-1
     * 
     * @returns 
     */
    pushPipeline() {
        const tag = "latestv." + common.generateNumber();
        const deploy = {
            "id": common.searchOfEnv("app", "pipelines", "0"),
            "params": [
                {
                    "name": "REPO_BRANCH",
                    "type": 14,
                    "description": "Repo branch\n",
                    "value": common.searchOfEnv("app", "branch", "id"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "IMAGE_TAG",
                    "type": 1,
                    "description": "image tag\n",
                    "value": tag,
                    "default": "",
                    "required": true,
                    "securlyInject": false
                }
            ],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "env", "id"),
            "timeout": constants.PIPELINE_TIMEOUT
        }
        common.readOrWriteJsonFile("app", "tag", "id", tag);

        return deploy;
    }

    /**
     * ozone-git-pull-docker-image-build-and-push-set-deployment-image-v-1
     * 
     * @returns 
     */
    pushSetDeploymentImg() {
        const tag = "latestv." + common.generateNumber();
        const deploy = {
            "id": common.searchOfEnv("app", "pipelines", "1"),
            "params": [
                {
                    "name": "REPO_BRANCH",
                    "type": 14,
                    "description": "Repo branch\n",
                    "value": common.searchOfEnv("app", "branch", "id"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "IMAGE_TAG",
                    "type": 1,
                    "description": "image sha\n",
                    "value": tag,
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "DEPLOYMENT_NAME",
                    "type": 1,
                    "description": "docker git param\n",
                    "value": common.searchOfEnv("app", "custom_app", "name") + "-deployment",
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "DEPLOYMENT_NAMESPACE",
                    "type": 1,
                    "description": "deployment name\n",
                    "value": constants.NAMESPACE_NAME,
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "CONTAINER_NAME",
                    "type": 1,
                    "description": "container name\n",
                    "value": common.searchOfEnv("app", "custom_app", "name"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                }
            ],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "env", "id"),
            "timeout": constants.PIPELINE_TIMEOUT
        }

        common.readOrWriteJsonFile("app", "tag", "id", tag);

        return deploy;
    }

    /**
     * ozone-git-pull-docker-image-build-and-template-deploy-v-1
     * 
     * @returns 
     */
    templateDeploy() {
        const tag = "latestv." + common.generateNumber();

        const deploy = {
            "id": common.searchOfEnv("app", "pipelines", "2"),
            "params": [
                {
                    "name": "REPO_BRANCH",
                    "type": 14,
                    "description": "Repo branch\n",
                    "value": common.searchOfEnv("app", "branch", "id"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "IMAGE_TAG",
                    "type": 1,
                    "description": "image tag\n",
                    "value": tag,
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "YAML_STRING",
                    "type": 15,
                    "description": "YAML string to apply",
                    "value": "",
                    "default": "",
                    "required": true,
                    "securelyInject": true,
                    "resourceID": common.searchOfEnv("app", "template", "id")
                }
            ],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "env", "id"),
            "pipelineRunID": null,
            "timeout": constants.PIPELINE_TIMEOUT
        }

        common.readOrWriteJsonFile("app", "tag", "id", tag);

        return deploy;
    }

    

    /**
     * ozone-set-deployment-image-v-1
     * @returns 
     */
    setDeploymentImg() {
        const deploy = {
            "id": common.searchOfEnv("app", "pipelines", "3"),
            "params": [
                {
                    "name": "IMAGE_TAG",
                    "type": 1,
                    "description": "image tag\n",
                    "value": common.searchOfEnv("app", "tag", "id"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "DEPLOYMENT_NAME",
                    "type": 1,
                    "description": "docker git param\n",
                    "value": common.searchOfEnv("app", "custom_app", "name") + "-deployment",
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "DEPLOYMENT_NAMESPACE",
                    "type": 1,
                    "description": "deployment name\n",
                    "value": constants.NAMESPACE_NAME,
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "CONTAINER_NAME",
                    "type": 1,
                    "description": "container name\n",
                    "value": common.searchOfEnv("app", "custom_app", "name"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                }
            ],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "env", "id"),
            "timeout": constants.PIPELINE_TIMEOUT
        }

        return deploy;
    }

    /**
     * ozone-templates-deploy-pipeline-v-1
     * @returns 
     */
    templatesDeployPipeline() {
        const deploy = {
            "id": common.searchOfEnv("app", "pipelines", "4"),
            "params": [
                {
                    "name": "IMAGE_TAG",
                    "type": 11,
                    "description": "Image tag\n",
                    "value": common.searchOfEnv("app", "tag", "id"),
                    "default": "",
                    "required": true,
                    "securlyInject": false
                },
                {
                    "name": "YAML_STRING",
                    "type": 15,
                    "description": "YAML string to apply",
                    "value": "",
                    "default": "",
                    "required": true,
                    "securelyInject": true,
                    "resourceID": common.searchOfEnv("app", "template", "id")
                }
            ],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "env", "id"),
            "pipelineRunID": null,
            "timeout": constants.PIPELINE_TIMEOUT
        }

        return deploy;
    }

    /**
     * define for webhook generic type pipeline creation
     * @returns object
     */
    genericPipeline() {
        const webhook = {
            "type": common.searchOfEnv("webhook", "type", "id"),
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [
                        {
                            "name": "REPO_BRANCH",
                            "type": 14,
                            "description": "Repo branch\n",
                            "value": common.searchOfEnv("app", "branch", "id"),
                            "default": "",
                            "required": true,
                            "securelyInject": false,
                            "overrideField": ""
                        },
                        {
                            "name": "IMAGE_TAG",
                            "type": 1,
                            "description": "image tag\n",
                            "value": "latestv." + common.generateNumber(),
                            "default": "",
                            "required": true,
                            "securelyInject": false,
                            "overrideField": ""
                        }
                    ],
                    "envID": common.searchOfEnv("app", "env", "id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id")
                }
            },
            "name": "pipe-" + common.getSmallCharStr(2)
        }


        return webhook;
    }

    /**
     * define for webhook generic type release creation
     * @returns object
     */
    genericRelease() {
        const release = {
            "name": "rele-" + common.getSmallCharStr(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "release": {
                    "releaseID": common.searchOfEnv("release", "release_creation", "id"),
                    "steps": [{
                        "name": "test",
                        "typeID": common.searchOfEnv("release", "step", "id"),
                        "pipeline": {
                            "pipeline": {
                                "id": common.searchOfEnv("release", "pipeline", "id"),
                                "created_at": "0001-01-01T00:00:00Z",
                                "updated_at": null,
                                "account_id": 0,
                                "created_by_id": 0,
                                "updated_by_id": 0,
                                "uid": "",
                                "kind": "",
                                "params": null,
                                "provider_id": "000000000000000000000000",
                                "workspaces": {
                                    "items": null
                                },
                                "visibility": {
                                    "showToUser": false
                                }
                            },
                            "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                            "clusterID": common.searchOfEnv("app", "cluster", "id"),
                            "triggerParams": [{
                                "name": "REPO_BRANCH",
                                "type": 14,
                                "description": "Repo branch\n",
                                "value": common.searchOfEnv("app", "branch", "id"),
                                "default": "",
                                "required": true,
                                "securelyInject": false
                            },
                            {
                                "name": "IMAGE_TAG",
                                "type": 1,
                                "description": "image tag\n",
                                "value": "latestv." + common.generateNumber(),
                                "default": "",
                                "required": true,
                                "securelyInject": false
                            }]
                        }
                    }]
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id")
        }

        return release;
    }

    /**
     * define for webhook creation param in github pull request
     * @returns 
     */
    githubPull() {
        const pull = {
            "name": "gitpull-" + common.getRandomString(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "github": {
                "repositoryID": common.searchOfEnv("webhook", "repository", "id"),
                "events": {
                    "eventType": common.searchOfEnv("webhook", "event_type", "id"),
                    "pr": {
                        "branches": [
                            common.searchOfEnv("webhook", "branch", "id")
                        ]
                    }
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [{
                        "name": "REPO_BRANCH",
                        "type": 14,
                        "description": "Repo branch\n",
                        "value": "",
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    },
                    {
                        "name": "IMAGE_TAG",
                        "type": 1,
                        "description": "image tag\n",
                        "value": "latestv." + common.generateNumber(),
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    }],
                    "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id"),
                }
            }
        }

        return pull;
    }

    /**
     * define for webhook creation param in github push banch
     * @returns 
     */
    githubPush() {
        const push = {
            "name": "gitpush-" + common.getRandomString(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "github": {
                "repositoryID": common.searchOfEnv("webhook", "repository", "id"),
                "events": {
                    "eventType": common.searchOfEnv("webhook", "event_type", "id"),
                    "push": {
                        "branches": [
                            common.searchOfEnv("webhook", "branch", "id")
                        ]
                    }
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [{
                        "name": "REPO_BRANCH",
                        "type": 14,
                        "description": "Repo branch\n",
                        "value": "",
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    },
                    {
                        "name": "IMAGE_TAG",
                        "type": 1,
                        "description": "image tag\n",
                        "value": "latestv." + common.generateNumber(),
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    }],
                    "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id"),
                }
            }
        }

        return push;
    }

    /**
     * define for webhook creation param in bitbucket pull request
     * @returns 
     */
    bitbucketPull() {
        const pull = {
            "name": "bitbucketpull-" + common.getRandomString(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "bitbucket": {
                "repositoryID": common.searchOfEnv("webhook", "repository", "id"),
                "events": {
                    "eventType": common.searchOfEnv("webhook", "event_type", "id"),
                    "pr": {
                        "branches": [
                            common.searchOfEnv("webhook", "branch", "id")
                        ]
                    }
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [{
                        "name": "REPO_BRANCH",
                        "type": 14,
                        "description": "Repo branch\n",
                        "value": "",
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    },
                    {
                        "name": "IMAGE_TAG",
                        "type": 1,
                        "description": "image tag\n",
                        "value": "latestv." + common.generateNumber(),
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    }],
                    "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id"),
                }
            }
        }

        return pull;
    }

    /**
     * define for webhook creation param in bitbucket push branch
     * @returns 
     */
    bitbucketPush() {
        const push = {
            "name": "bitbucketpush-" + common.getRandomString(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "bitbucket": {
                "repositoryID": common.searchOfEnv("webhook", "repository", "id"),
                "events": {
                    "eventType": common.searchOfEnv("webhook", "event_type", "id"),
                    "push": {
                        "branches": [
                            common.searchOfEnv("webhook", "branch", "id")
                        ]
                    }
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [{
                        "name": "REPO_BRANCH",
                        "type": 14,
                        "description": "Repo branch\n",
                        "value": "",
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    },
                    {
                        "name": "IMAGE_TAG",
                        "type": 1,
                        "description": "image tag\n",
                        "value": "latestv." + common.generateNumber(),
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    }],
                    "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id"),
                }
            }
        }

        return push;
    }

    /**
     * define for webhook creation param in gitlab pull request
     * @returns 
     */
    gitlabPull() {
        const pull = {
            "name": "labpull-" + common.getRandomString(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "gitlab": {
                "repositoryID": common.searchOfEnv("webhook", "repository", "id"),
                "events": {
                    "eventType": common.searchOfEnv("webhook", "event_type", "id"),
                    "pr": {
                        "branches": [
                            common.searchOfEnv("webhook", "branch", "id")
                        ]
                    }
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [{
                        "name": "REPO_BRANCH",
                        "type": 14,
                        "description": "Repo branch\n",
                        "value": "",
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    },
                    {
                        "name": "IMAGE_TAG",
                        "type": 1,
                        "description": "image tag\n",
                        "value": "latestv." + common.generateNumber(),
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    }],
                    "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id"),
                }
            }
        }

        return pull;
    }

    /**
     * define for webhook creation param in gitlab push banch
     * @returns 
     */
    gitlabPush() {
        const push = {
            "name": "labpush-" + common.getRandomString(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "gitlab": {
                "repositoryID": common.searchOfEnv("webhook", "repository", "id"),
                "events": {
                    "eventType": common.searchOfEnv("webhook", "event_type", "id"),
                    "push": {
                        "branches": [
                            common.searchOfEnv("webhook", "branch", "id")
                        ]
                    }
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
            "application": {
                "applicationID": common.searchOfEnv("app", "custom_app", "id"),
                "triggerType": common.searchOfEnv("webhook", "triggerType", "id"),
                "pipeline": {
                    "pipelineID": common.searchOfEnv("webhook", "pipeline", "id"),
                    "params": [{
                        "name": "REPO_BRANCH",
                        "type": 14,
                        "description": "Repo branch\n",
                        "value": "",
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    },
                    {
                        "name": "IMAGE_TAG",
                        "type": 1,
                        "description": "image tag\n",
                        "value": "latestv." + common.generateNumber(),
                        "default": "",
                        "required": true,
                        "securelyInject": false,
                        "overrideField": ""
                    }],
                    "envID": common.searchOfEnv("app", "custom_app", "env_id"),
                    "clusterID": common.searchOfEnv("app", "cluster", "id"),
                }
            }
        }

        return push;
    }

    /**
     * define for webhok generic type request send body param in override value on the pipeline and release
     * @returns 
     */
    overrideParam() {
        const override = {
            "latest": "v1",
            "a": {
                "a": "test-a0",
                "b": "test-b0"
            },
            "b": {
                "a": "test-a1",
                "b": "test-b1"
            },
            "c": {
                "a": "test-a2",
                "b": "test-b2"
            }
        }

        return override;
    }

    /**
     * define for custome app in release creation 
     * @returns 
     */
    release() {
        const release = {
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "name": "release-" + common.getAppStr(4),
            "steps": [
                {
                    "name": "test",
                    "typeID": common.searchOfEnv("release", "step", "id"),
                    "pipeline": {
                        "pipeline": {
                            "id": common.searchOfEnv("release", "pipeline", "id")
                        },
                        "triggerParams": [
                            {
                                "name": "REPO_BRANCH",
                                "type": 14,
                                "description": "Repo branch\n",
                                "value": common.searchOfEnv("app", "branch", "id"),
                                "default": "",
                                "required": true,
                                "securelyInject": false
                            },
                            {
                                "name": "IMAGE_TAG",
                                "type": 1,
                                "description": "image tag\n",
                                "value": "latest1.1",
                                "default": "",
                                "required": true,
                                "securelyInject": false
                            }
                        ],
                        "envID": common.searchOfEnv("app", "env", "id"),
                        "clusterID": common.searchOfEnv("app", "cluster", "id")
                    }
                }
            ]
        }

        return release;
    }

    /**
     * define for helm app creation
     * @returns 
     */
    helmApp() {
        const helm = {
            "type_id": common.searchOfEnv("app", "helm_app", "type_id"),
            "name": "helm-" + common.getAppStr(4),
            "envs": [common.searchOfEnv("app", "custom_app", "env_id")],
            "helm": { "catalogID": common.searchOfEnv("app", "helm_app", "catalog_id") }
        }

        return helm;
    }

    /**
     * define for jira webhook creation param
     * @returns 
     */
    jiraWebhook() {
        const jira = {
            "name": "jira-" + common.getAppStr(2),
            "type": common.searchOfEnv("webhook", "type", "id"),
            "jira": {
                "providerID": common.searchOfEnv("webhook", "provider", "id"),
                "resolution": {
                    "projectID": common.searchOfEnv("webhook", "jira_project", "id"),
                    "resolutionColumn": constants.Resolution_Name
                }
            },
            "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
        }

        return jira;
    }

    helmRelease() {
        const helm_release = {
            "name": "helmrelease-" + common.getSmallCharStr(2),
            "application_id": common.searchOfEnv('app', 'helm_app', 'creation_id'),
            "clusterNamespace": [{
                "cluster": common.searchOfEnv('app', 'cluster', 'id'),
                "namespace": common.searchOfEnv('app', 'helm_app', 'namespace_name')
            }],
            "version": common.searchOfEnv('app', 'helm_app', 'chart_id'),
            "values": "replicaCount: 1\nimage:\n   repository: quay.io/samsung_cnct/jenkins-operator\n   tag: 0.3.0\n   pullPolicy: IfNotPresent\n\n# short resource name override\nnameOverride: ''\n\n# long resource name override\nfullnameOverride: ''\n\n# keep CRDs installed after a release deletion\nkeepCRDs: false\n\n# install RBAC resources\nrbac: true\n\n# install CRDs from chart resources (rather than from embedded binary ones)\nchartCrds: true\n\n# command line arguments to be passed to the operator binary\nargs:\n- --alsologtostderr\n- --install-crds=false\n\nresources: {}\nnodeSelector: {}\ntolerations: []\naffinity: {}\n"
        }

        return helm_release;
    }

    /**
     *  Link pipeline params details
     * @returns 
     */
    pythonTest() {
        const python = {
            "id": common.searchOfEnv("app", "link_pipeline", "id"),
            "params": [{
                "name": "REPO_BRANCH",
                "type": 14,
                "description": "Repo branch\n",
                "value": common.searchOfEnv("app", "branch", "id"),
                "default": "",
                "required": true,
                "securelyInject": false
            }],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "custom_app", "env_id")
        }

        return python;
    }

    canaryDeploy() {
        const canary = {
            "id": common.searchOfEnv("app", "link_pipeline", "id"),
            "params": [{
                "name": "REPO_BRANCH",
                "type": 14,
                "description": "Repo branch\n",
                "value": common.searchOfEnv("app", "branch", "id"),
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "IMAGE_TAG",
                "type": 1,
                "description": "image tag\n",
                "value": "latestv." + common.generateNumber(),
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "PROGRESS_DEADLINE",
                "type": 1,
                "description": "Canary Progress Deadline",
                "value": "30",
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "CANARY_INTERVAL",
                "type": 1,
                "description": "Canary CANARY_INTERVAL desc",
                "value": "30s",
                "default": "", "required": true,
                "securelyInject": false
            },
            {
                "name": "CANARY_THRESHOLD",
                "type": 1,
                "description": "Canary Threshold Deadline",
                "value": "30",
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "CANARY_WEIGHT_INCREMENT_RATE",
                "type": 1,
                "description": "Canary Weight Increment",
                "value": "10",
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "CANARY_WEIGHT",
                "type": 1,
                "description": "Canary",
                "value": "50",
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "REQUEST_SUCCESS_RATE_THRESHOLD",
                "type": 1,
                "description": "Canary request success",
                "value": "90",
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "REQUEST_DURATION_THRESHOLD_MAX",
                "type": 1,
                "description": "Canary Weight Threshold",
                "value": "90",
                "default": "",
                "required": true,
                "securelyInject": false
            }],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "custom_app", "env_id")
        }

        return canary;
    }

    sonarQube() {
        const sonarqube = {
            "id": common.searchOfEnv("app", "link_pipeline", "id"),
            "params": [{
                "name": "PROJECT_KEY",
                "type": 1,
                "description": "PROJECT_KEY",
                "value": constants.PROJECT_KEY,
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "SONARQUBE_TOKEN",
                "type": 3200,
                "description": "SONARQUBE_TOKEN",
                "value": "",
                "default": "",
                "required": true,
                "securelyInject": true,
                "resourceID": common.searchOfEnv("app", "link_pipeline", "provider_id")
            },
            {
                "name": "SONARQUBE_HOST",
                "type": 3201,
                "description": "SONARQUBE_HOST",
                "value": "",
                "default": "",
                "required": true,
                "securelyInject": true,
                "resourceID": common.searchOfEnv("app", "link_pipeline", "provider_id")
            },
            {
                "name": "REPO_BRANCH",
                "type": 14,
                "description": "Repo branch\n",
                "value": common.searchOfEnv("app", "branch", "id"),
                "default": "",
                "required": true,
                "securelyInject": false
            }],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "custom_app", "env_id")
        }

        return sonarqube;
    }

    gitlabci() {
        const ci = {
            "id": common.searchOfEnv("app", "link_pipeline", "id"),
            "params": [{
                "name": "TRIGGER_TOKEN",
                "type": 1,
                "description": "trigger token for pipeline\n",
                "value": constants.GITLAB_CI_TOKEN,
                "default": "",
                "required": true,
                "securelyInject": true
            },
            {
                "name": "REPO_BRANCH", "type": 14,
                "description": "Repository branch\n",
                "value": common.searchOfEnv("app", "branch", "id"),
                "default": "",
                "required": true,
                "securelyInject": false
            }],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "custom_app", "env_id")
        }

        return ci;
    }

    snykContainer() {
        const snyk = {
            "id": common.searchOfEnv("app", "link_pipeline", "id"),
            "params": [{
                "name": "SNYK_TOKEN",
                "type": 3100,
                "description": "SNYK_TOKEN",
                "value": "",
                "default": "",
                "required": true,
                "securelyInject": true,
                "resourceID": common.searchOfEnv("app", "link_pipeline", "provider_id")
            },
            {
                "name": "IMAGE_TAG",
                "type": 11,
                "description": "image sha\n",
                "value": common.searchOfEnv("app", "tag", "id"),
                "default": "",
                "required": true,
                "securelyInject": false
            }],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "custom_app", "env_id")
        }

        return snyk;
    }

    snykRepo() {
        const snyk = {
            "id": common.searchOfEnv("app", "link_pipeline", "id"),
            "params": [{
                "name": "command",
                "type": 1,
                "description": "",
                "value": "test",
                "default": "test",
                "required": false,
                "securelyInject": false
            },
            {
                "name": "args",
                "type": 1,
                "description": "",
                "value": "test",
                "default": "",
                "required": true,
                "securelyInject": false
            },
            {
                "name": "SNYK_TOKEN",
                "type": 3100,
                "description": "SNYK_TOKEN",
                "value": "",
                "default": "",
                "required": true,
                "securelyInject": true,
                "resourceID": common.searchOfEnv("app", "link_pipeline", "provider_id")
            },
            {
                "name": "REPO_BRANCH",
                "type": 14,
                "description": "Repo branch\n",
                "value": common.searchOfEnv("app", "branch", "id"),
                "default": "",
                "required": true,
                "securelyInject": false
            }
            ],
            "applicationID": common.searchOfEnv("app", "custom_app", "id"),
            "clusterID": common.searchOfEnv("app", "cluster", "id"),
            "envID": common.searchOfEnv("app", "custom_app", "env_id")
        }


        return snyk;
    }
}

module.exports = new Param();