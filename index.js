const core = require('@actions/core')
const semanticRelease = require('semantic-release')

const run = async () => {
  try {
    const dryRun = core.getInput('dryRun')
    const result = await semanticRelease({
      dryRun: String(dryRun) === 'true'
    })

    if (!result) {
      throw Error('Creating release failed')
    }

    const { nextRelease } = result
    core.setOutput('version', nextRelease.version)
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
