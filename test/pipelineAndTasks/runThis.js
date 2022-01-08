/**
 * this file is need as javascript mocha (test runner) module run files in lexicographical order
 * so always delete.js will run before post.js as d comes first . 
 * To prevent it, we need to write custom file which overwrites this inbuilt feature of mocha
 */

require('../../test/login.test');

require('../../test/pipelineAndTasks/pipelines/pipeline.test');
require('../../test/pipelineAndTasks/tasks/task.test');







