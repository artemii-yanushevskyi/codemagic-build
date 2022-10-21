import axios from 'axios'

import {
    getInput,
    setOutput,
    setFailed,
} from '@actions/core'
import { context } from '@actions/github'

const appId = getInput('app-id')
const workflowId = getInput('workflow-id')
const token = getInput('token')

const { ref, headRef } = context

console.log(`ref: ${ref}, headRef: ${headRef}`)

const branch = ref.split('refs/heads/')[1] || headRef

const url = 'https://api.codemagic.io/builds'

const payload = {
    appId,
    branch,
    workflowId,
}

const headers = {
    'x-auth-token': token,
}

axios.post(url, payload, { headers }).then(({ data }) => {
    setOutput('build-id', data.buildId)
}).catch(error => {
    setFailed(error.message)
})

