// @flow
import React, { Component } from 'react';
import logo from '../holo-logo.svg';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

import { makeData, Logo, Tips } from "../utils/utils";
import { advancedExpandTableHOC } from "./systemTable";
import { getAllApps } from "../utils/app-cmd";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

type Props = {};

const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);


export const addDataState = (app_details)=>{
console.log("Apps: ",app_details)
  this.state = {
    apps: app_details
  };
}

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
     getAllApps();
    this.state = {
      data: makeData()
    };
  }

  render() {
    console.log("ENTERED HOME")
    const { data } = this.state;
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to HCAdmin-GUI</h2>
        </div>
        <AdvancedExpandReactTable
          data={data}
          columns={columns}
          defaultPageSize={50}
          className="-striped -highlight"
          SubComponent={({ row, nestingPath, toggleRowSubComponent }) => {
            return (
              <div style={{ padding: "20px" }}>
                <button
                  onClick={e => toggleRowSubComponent({ nestingPath }, e)}
                >
                  Bridged-Apps {row.appName} {row.authorName}
                </button>
              </div>
            );
          }}
        />
      </div>
      </div>
    );
  }
}



/*Data*/
const columns = [{
      Header: 'App',
      columns: [{
        Header: 'App Name',
        accessor: 'appName'
      }, {
        Header: 'DNA',
        id: 'authorName',
        accessor: d => d.authorName
      }]
    }, {
      Header: 'Stats',
      columns: [{
        Header: 'CPU %',
        accessor: 'progress',
        Cell: row => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#dadada',
              borderRadius: '2px'
            }}
          >
            <div
              style={{
                width: `${row.value}%`,
                height: '100%',
                backgroundColor: row.value > 66 ? '#85cc00'
                  : row.value > 33 ? '#ffbf00'
                  : '#ff2e00',
                borderRadius: '2px',
                transition: 'all .2s ease-out'
              }}
            />
          </div>
        )
      }, {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
          <span>
            <span style={{
              color: row.value === 'installed' ? '#57d500'
                : row.value === 'uninstalled' ? '#ff2e00'
                : '#ffbf00',
              transition: 'all .3s ease'
            }}>
              &#x25cf;
            </span> {
              row.value === 'installed' ? `Installed`
              : row.value === 'uninstalled' ? `Uninstalled`
              : 'Bridging'
            }
          </span>
        )
      }]
    }];
