# ozone-api-automation  
[Actions Status](https://github.com/in2tivetech/ozone-api-automation.git)

## Introduction
This repository is used for executing automation test by using mocha test framework, it's provides and easy to manage API and a lot of syntactical sugar on top of the mocha specification.

## Version
1.0.0

## Frameworks
- Mocha
- Chai

## Features
- GitHub Actions

## Requirements
- Node version 12 or higher

## Setup
```
$ git clone https://github.com/in2tivetech/ozone-api-automation.git
$ npm install
```

## Run test suites and generate reports
──────────────────────────────────────

$ npm run test:run

──────────────────────────────────────

# Framework structure
The framework base on Mocha & chai
```
├── config                           // folder contains config and constant data for in ther Ozone Panel  
│   ├── config.js                    // file contains common variables use (baseUrl etc...)
│   ├── contants.js                  // file contains set all string use in this project of the status(OK, Not Found etc..)
│   ├── api.js                       // file contains set all API use in this project
│   ├── query.js                     // file contains set all query data use in this project
├── parameter
│   ├── param                        // file contains use send body param in API
├── resource                         // folder contains use environment file
├── schemaValidate                   // folder contains use schema validate in after API response
├── test                             // folder contains data for framework test files
│   ├── collections
│   ├── providers                    // folder add all providers module API's
│   ├── application                  // folder add custom and helm app API's
│   ├── pipeline                     // folder add all pipeline runs API's    
│   ├── webhook                      // folder add all webhook API's
│   ├── registries                   // folder add all registries API's
│   ├── cluster                      // folder add all cluster API's
├── Utility                          // folder contains data for framework ElementHandler, Utility
├── package.json                     // file to manage all dependencies to using in this project
├── .mocharc.js                      // config file to execute test in web
```
