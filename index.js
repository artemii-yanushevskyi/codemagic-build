const core = require('@actions/core')

try {
    const appId = core.getInput('app-id')
    console.log(`app_id: ${appId}`)
    const workflowId = core.getInput('workflow-id')
    console.log(`workflow_id: ${workflowId}`)
    core.setOutput('build-id', 'test-build-id')
} catch (error) {
    core.setFailed(error.message)
}

