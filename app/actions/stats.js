export const UPDATE_DOWNLOADS = 'UPDATE_DOWNLOADS';
export const UPDATE_INSTALLED = 'UPDATE_INSTALLED';
export const UPDATE_ALL_STATS = 'UPDATE_ALL_STATS';
export const FETCH_STATE = 'FETCH_STATE';

export function update_downloaded_apps(appDetails) {
  // console.log("download appDetails", appDetails);
  return {
    type: UPDATE_DOWNLOADS,
    payload:appDetails
  };
}

export function update_installed_apps(appDetails) {
  // console.log("install appDetails", appDetails);
  return {
    type: UPDATE_INSTALLED,
    payload:appDetails
  };
}

export function update_all_stats(newData) {
  return {
    type: UPDATE_ALL_STATS,
    payload: newData
  };
}

export function fetch_state() {
  return {
    type: FETCH_STATE
  };
}
