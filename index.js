const core = require('@actions/core');
const io = require('@actions/io');

const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    await io.mkdirP('wow test');
    // console.log("wowo it runs")
    // const ms = core.getInput('milliseconds');
    // core.info(`Waiting ${ms} milliseconds ...`);

    // core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // await wait(parseInt(ms));
    // core.info((new Date()).toTimeString());

    // core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
