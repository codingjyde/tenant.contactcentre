const { spawn } = require('child_process');

function runCommand(command, nextCommand) {
  const childProcess = spawn(command, [], { shell: true });

  childProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  childProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  childProcess.on('exit', (code) => {
    if (code === 0) {
      console.log(`Process exited with code ${code}`);
      if (nextCommand) {
        console.log(`Running next command: ${nextCommand}`);
        runCommand(nextCommand);
      }
    } else {
      console.error(`Process exited with code ${code}`);
    }
  });
}

const serverIp = "104.248.45.130";

runCommand("quasar build", `rsync -avz --delete ./dist/spa/ root@${ serverIp }:/apps/contactcentre/tenant/`);
