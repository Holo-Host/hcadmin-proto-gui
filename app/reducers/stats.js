import { UPDATE_DOWNLOADS, UPDATE_INSTALLED, UPDATE_ALL_STATS, FETCH_STATE  } from '../actions/stats';

// Structure of downloaded_apps, installed_app, and runningApps :
// downloaded_apps:[{
//   appName: "",
//   dna: "",
//   progress: 0,
//   status: "",
//   bridgedFrom: {token: ""},
//   bridgedTo: {name:"", dna: ""}
// }],

const defaultState  = {
  downloaded_apps: undefined,
  installed_apps: undefined,
  AllStats:[{}]
};

export default function stats (oldState = defaultState, action) {
  const state = {
    ...oldState
  };

  const {type, payload} = action;
  switch (type) {
    case UPDATE_DOWNLOADS: {
      console.log("reducer DOWNLOAD payload", payload);
      const downloaded_apps = payload;

      // state = { ...state, downloaded_apps};
      // console.log("------->",state);
      return { ...state, downloaded_apps};
    }

    case UPDATE_INSTALLED: {
      console.log("installed payload", payload);
      const installed_apps = payload;
      return { ...state, installed_apps};
    }

    case UPDATE_ALL_STATS: {
      console.log("all stats payload", payload);
      const AllStats = payload;
      return { ...state, AllStats};
    }

    case FETCH_STATE: {
      console.log("Reducer STATE", state);
      return { ...state};
    }

    default:{
      console.log("default state", state);
      return state}
    }
  }
