import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type HCAdminStateType = {
  this.state = {
    downloaded_apps:[],
    installed_apps: [],
    process_details:[],
    AllStats:[{}]
};
//
export type Action = {
  type: string
};

export type GetState = () => HCAdminStateType;
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<GetState, Action>;
