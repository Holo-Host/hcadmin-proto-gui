export const manageAllApps = (allApps) => {
  var listOfApps = allApps.split("\n");
  let app_details = [];
  let obj = null;

  for (let i = 1; i < listOfApps.length; i++) {
    if (listOfApps[i].includes('bridged')) {
      if (listOfApps[i].includes('from')) {
        const trimedList = listOfApps[i].trim();
        var bridgedDs = trimedList.split(" ");
        obj = {
          "app_name": obj.app_name,
          "app_dna": obj.app_dna,
          "bridgedFrom": {
            token: bridgedDs[4]
          }
        };
      } else if (listOfApps[i].includes('to')) {
        const trimedList = listOfApps[i].trim();
        var bridgedDs = trimedList.split(" ");

        obj = {
          "app_name": obj.app_name,
          "app_dna": obj.app_dna,
          "bridgedTo": {
            name: bridgedDs[2],
            dna: bridgedDs[3].replace('(', '').replace(')', '')
          }
        };
      }
    } else {
      if (obj !== null && !app_details.includes(obj)) {
        app_details.push(obj);
      }
      const trimedList = listOfApps[i].trim();
      var appDs = trimedList.split(" ");
      if (appDs[0] !== '') {
        obj = {
          "app_name": appDs[0],
          "app_dna": appDs[1]
        };
      }
    }
  }
  console.log("App_Details: ", app_details)
  return dataRefactor(app_details);
};

export const manageAllDownloadedApps=(allApps)=>{
  let listOfApps = allApps.split("\n");
  listOfApps=listOfApps.filter((app)=>{
    return app!=="";
  })
  const app_details=listOfApps.map((app)=>{
    return {"app_name":app}
  })
  return dataRefactor(app_details);
}

const dataRefactor = (app_details) => {
  const CERT_LENGTH = app_details.length;
  const insertAppDetails = (app) => {
    // console.log("inside insertAppDetails");
    const statusChance = Math.random();
    // console.log("app", app);
    if (app !== parseInt(app, 10)) {
      const newObj = {
        appName: app.app_name,
        dna: app.app_dna,
        progress: app.app_dna !==undefined ?
          Math.floor(Math.random() * 100) : 0,
        status: app.app_dna !==undefined ?
          "installed" : "uninstalled",
        bridgedFrom:app.bridgedFrom,
        bridgedTo:app.bridgedTo
      };
      // console.log("newObj", newObj);
      return newObj;
    } else {
      return "";
    }
  }

  const range = (length) => {
    const lengthArray: Array < any > = [];
    for (let i = 0; i < length; i++) {
      lengthArray.push(i);
    }
    return lengthArray;
  };

  const dataGenerate = (length = CERT_LENGTH) => {
    return app_details.map(app => {
      return {
        ...insertAppDetails(app),
        children: range(length - 1).map(insertAppDetails) // # per page...
      };
    })
  }
  return dataGenerate()
}

export const refactorPS = (pids) => {
  // console.log("Data: ",pids);
  const lines = pids.split('\n').map((line) => {
    if (line !== '' && line !== '%CPU %MEM CMD') {
      // console.log("Line: ",line);
      const values = line.trim().split(' ')
      console.log("values: "+values);
      if(values[5]!=="S+"){
        return {
          "PID": values[0],
          "app_name": values[11],
          "portNUmber":values[12]
        };
      }
    }
  })

  const data = lines.filter((pidDetails) => {
    return pidDetails !== undefined;
  })
  return data
}

export const refactorStats = (pid, stats) => {
  const lines = stats.split('\n').map((line) => {
    if (line !== '' && line !== '%CPU %MEM CMD') {
      const values = line.trim().split(' ')
      console.log("values: "+values);
      return {
        "CPU": values[0],
        "MEM": values[2],
        "app_name":values[4],
        "portNumber":values[5]
      };
    }
  })
  const data = lines.filter((stats) => {
    return stats !== undefined;
  })
  return data[0];
}


// Second find what apps are running and assign appropriate flags for those apps
const getInstalledApps = () => {

}



// Lastly: Compile all the info needed for each app in the way the table requires
export const getAppDetails = () => {

}



const getStopedApps = () => {

}


// TODO: Wen we figure what location the HAppsStore Downloads to use that to sync this app
// And show the app to be installed
const getDownloadedApps = () => {

}
