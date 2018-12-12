import { UPDATE_DOWNLOADS, UPDATE_INSTALLED, UPDATE_ALL_STATS, FETCH_STATE  } from '../actions/stats';
import { Map } from 'immutable';

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
  AllStats:[]
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
      return { ...state, downloaded_apps};
    }

    case UPDATE_INSTALLED: {
      console.log("installed payload", payload);
      const installed_apps = payload;
      return { ...state, installed_apps};
    }

    case UPDATE_ALL_STATS: {
      console.log("all stats payload", payload);
      // const newStats = Map(action.payload);
      // const oldStats = Map(state.AllStats);
      // return {...state, AllStats: oldStats.merge(newStats) }

      const newStats = oldStats.concat(payload);  // merge the two arrays
      const AllStats = newStats.filter((stats, i) => {  // filter out the replicants
        return newStats.indexOf(stats) === i}
      );
      return {...state, AllStats }
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
