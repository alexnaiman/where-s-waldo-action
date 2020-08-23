const core = require("@actions/core");
const github = require("@actions/github");
const base64 = require("js-base64").Base64;

const octokit = github.getOctokit(core.getInput("github-token"));

const WALDO = "๑<{8D-/-<";

async function run() {
  try {
    const repoInfo = github.context.repo;
    const latestVersion = await octokit.git.getCommit({
      ...repoInfo,
      commit_sha: github.context.sha,
    });
    core.info("Searching git...");
    const tree = await octokit.git.getTree({
      ...repoInfo,
      tree_sha: latestVersion.data.tree.sha,
      recursive: 1,
    });
    core.info("Figuring out where to put Waldo");
    const onlyFiles = tree.data.tree.filter((elem) => elem.type === "blob");
    var { sha: file_sha, path } = onlyFiles[
      Math.floor(Math.random() * onlyFiles.length)
    ];
    const fileBase64 = await octokit.git.getBlob({
      ...repoInfo,
      file_sha,
    });
    const fileTextForWaldo = base64.decode(fileBase64.data.content);
    const waldosPosition = Math.floor(Math.random() * fileTextForWaldo.length);

    core.info("Placing Waldo");
    const waldosFile =
      fileTextForWaldo.substr(0, waldosPosition) +
      WALDO +
      fileTextForWaldo.substr(waldosPosition);

    const encodedWaldosFile = base64.encode(waldosFile);

    return octokit.repos.createOrUpdateFileContents({
      ...repoInfo,
      path,
      message: "Where's Waldo?",
      content: encodedWaldosFile,
    });
  } catch (error) {
    core.setFailed(error.message);
    return;
  }
}

run();
