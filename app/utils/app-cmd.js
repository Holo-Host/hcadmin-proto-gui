import addDataState from '../components/Home';
import cmd from 'node-cmd'

// First get all the apps from .holochain
export var getAllApps = () => {
  cmd.get(
    `hcadmin`,
    function(err, data, stderr) {
      if (!err) {
        console.log('/.holochain contains these files :\n\n', data)
        manageAllApps(data);
      } else {
        console.log('error', err)
      }

    }
  );
  return "win"
}

const manageAllApps = (allApps) => {
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
      if (obj !== null) {
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
  addDataState(app_details);
};
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
