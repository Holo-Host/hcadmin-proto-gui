import { UPDATE_DOWNLOADS, UPDATE_INSTALLED, UPDATE_ALL_STATS  } from '../actions/stats';

// Structure of downloaded_apps, installed_app, and runningApps :
// downloaded_apps:[{
//   appName: "",
//   dna: "",
//   progress: 0,
//   status: "",
//   bridgedFrom: {token: ""},
//   bridgedTo: {name:"", dna: ""}
// }],

const defaultState:  = {
  downloaded_apps:[],
  installed_apps: [],
  runningApps:[],
  lastPortUsed:4140,
  AllStats:[{}]
};

export default (oldState = defaultState, action) => {
  const state = {
    ...oldState
  };

  const {type, payload} = action;
  switch (type) {
    case UPDATE_DOWNLOADS: {
      console.log(payload);
      const downloaded_apps = payload;
      return { ...state, downloaded_apps};
    }

    case UPDATE_ALL_STATS: {
      console.log(payload);
      const AllStats = payload;
      return { ...state, AllStats};
    }

    default:
      return state
    }
  }

  return state
};
