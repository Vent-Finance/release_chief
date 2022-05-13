const core = require('@actions/core')
const semanticRelease = require('semantic-release')

const run = async () => {
  try {
    const publish = core.getInput('dryRun')
    const result = await semanticRelease({
      dryRun: !publish
    })

    if (!result) {
      throw Error('Creating release failed')
    }

    const { nextRelease } = result
    core.setOutput('version', nextRelease)
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
