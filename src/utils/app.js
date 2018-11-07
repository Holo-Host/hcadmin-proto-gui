import {get,run} from './cmd'

// First get all the apps from .holochain
const getAllApps = () => {
  const allApps=get('cd ~/.holochain && ls');
  return allApps;
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
