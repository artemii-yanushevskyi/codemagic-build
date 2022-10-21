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

let branch = null
let tag = null

const { ref } = context
const refType = context['ref_type']
if (refType === 'branch') {
    const headRef = process.env.GITHUB_HEAD_REF
    branch = ref.split('refs/heads/')[1] || headRef
} else {
    tag = ref.split('refs/tags/')[1]
}

const url = 'https://api.codemagic.io/builds'

const payload = {
    appId,
    branch,
    tag,
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

