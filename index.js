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

    const { nextRelease, releases, lastRelease } = result
    const url = releases.find((release) => release.version === nextRelease.version)?.url

    core.setOutput('prevVersion', lastRelease?.version || 0)
    core.setOutput('version', nextRelease.version)
    core.setOutput('url', url)
    core.setOutput('type', nextRelease.type)
    core.setOutput('notes', nextRelease.notes)
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
