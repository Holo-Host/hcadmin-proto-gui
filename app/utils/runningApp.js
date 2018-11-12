const fs = require("fs");
const path = require("path");
// const process = request("process")
export const getRunningApps = () => {

    // TODO: set $HOME path in the state and use that variable to
        // try {
        //   process.chdir('/home/zo-el'); //Set that path
        //   console.log("New directory:", process.cwd());
        //   process.cwd()
        // } catch (err) {
        //   console.error('chdir:', err);
        // }

 const data = fs.readFileSync(path.resolve(__dirname, "../hcadmin-track.txt"));


  const dataString = data.toString();
  const lines = dataString.split('\n').map((line) => {
    if (line !== "") {
      const values = line.split(',')
      return {
        "app_name": values[0],
        "app_url": values[1]
      };
    }
  })
  const runningApps = lines.filter((app) => {
    return app !== undefined;
  });
  console.log("Running Apps: ", runningApps);
  return runningApps;
}

export const addRunningApps=(appName,portNumber)=>{
  const data = fs.readFileSync(path.resolve(__dirname, "../hcadmin-track.txt"));
  const newData = data+appName+','+'http://localhost:'+portNumber+'\n'
  fs.writeFile(path.resolve(__dirname, "../hcadmin-track.txt"), newData, function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});
}

export const decideFreePort = (runningApps) => {
  let startPort = 4141;
  const runningPorts=getPortsUsed(runningApps);
  while (runningPorts.includes(startPort)) {
    startPort++
  }
  console.log("StartPort",startPort)
  return startPort;
}

const getPortsUsed=(runningApps)=>{
  //Get port array
  let portsUsed=[];
  runningApps.filter((app)=>{
    const app_url=app.app_url;
    portsUsed.push(parseInt(app_url.substring(app_url.length - 4)))
  });
  // console.log("->",portsUsed);
  return portsUsed;
}
