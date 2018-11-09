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


const dataRefactor = (app_details) => {
  const CERT_LENGTH = app_details.length;
  const insertAppDetails = (app) => {
    // console.log("inside insertAppDetails");
    const statusChance = Math.random();
    // console.log("app", app);
    if (app !== parseInt(app, 10)) {
      const newObj = {
        appName: app.app_name,
        authorName: app.app_dna,
        progress: Math.floor(Math.random() * 100),
        status: statusChance > 0.5 ?
          "installed" : statusChance > 0.25 ? "uninstalled" : "bridged"
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
