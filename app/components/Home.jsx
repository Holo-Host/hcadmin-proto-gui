import React, { Component } from 'react';
import logo from '../holo-logo.svg';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import cmd from 'node-cmd'
import './Home.css';
import {
  update_downloaded_apps,
  update_installed_apps,
  update_running_apps,
  update_all_stats
 } from "../actions/stats";

import { makeData, Logo, Tips } from "../utils/utils";
import { hcJoin,hcUninstall,hcStart,hcStop } from "../utils/hc-install";
import { advancedExpandTableHOC } from "./systemTable";
import { manageAllApps,manageAllDownloadedApps,refactorPS,refactorStats } from "../utils/dataRefactor";
import { filterApps } from "../utils/table-filters";
import { getRunningApps,decideFreePort } from "../utils/runningApp";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

type Props = {
  downloaded_apps: {
    appName: string,
    dna: string,
    progress: number,
    status: string,
    bridgedFrom: {token: string},
    bridgedTo: {name:string, dna: string}
  },
  installed_apps: {
    appName: string,
    dna: string,
    progress: number,
    status: string,
    bridgedFrom: {token: string},
    bridgedTo: {name:string, dna: string}
  },
  runningApps: {
    appName: string,
    url: string
  }
  AllStats:[{
    CPU%: number,
    MEM%: number,
    progress: number,
  }],
  update_downloaded_apps: () => void,
  update_installed_apps: () => void,
  update_all_stats: () => void,
};

const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

export default class Home extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      installed_apps: [],
      downloaded_apps:[],
      process_details:[], //used to populate AllStats and running apps
      AllStats:[{}] // array of each app and its respective stats
    };
    this.setApps=this.setApps.bind(this);
    this.getInstalledApps=this.getInstalledApps.bind(this);
    this.getDownloadedApps=this.getDownloadedApps.bind(this);
    this.renderStatusButton=this.renderStatusButton.bind(this);
    this.renderRunningButton=this.renderRunningButton.bind(this);
    this.getStats=this.getStats.bind(this);
    this.getPIDs=this.getPIDs.bind(this);
    this.startApp=this.startApp.bind(this);
    this.setStats=this.setStats.bind(this);
  }

  componentDidMount() {
    this.setApps()
  }

  setApps=()=>{
    this.getInstalledApps();
    this.getDownloadedApps();
    // this.setState({runningApps:getRunningApps()});
    this.setState({AllStats:[{}]})
    this.getPIDs();
  };

  /** Calculate Stats **/
getPIDs = () => {
  const self = this;
  cmd.get(
    "ps ax | grep hcd",
    function(err, data, stderr) {
      if (!err) {
        // console.log('> Stats for :', data)
        const process_details = refactorPS(data)
        console.log("Process Details: ", process_details);
        // self.setState({process_details})
        self.getStats(process_details);
      } else {
        console.log('error', err)
      }
    }
  );
}

getStats = (process_details) => {
  process_details.forEach((process) => {
    this.getStatsForPID(process.PID)
  })
}
getStatsForPID = (pid) => {
  const self = this;
  cmd.get(
    "ps -p " + pid + " -o %cpu,%mem,cmd",
    function(err, data, stderr) {
      if (!err) {
        // console.log('> Stats for :', pid, "\n", data)
        // TODO: Refresh the electron page
        const stats = refactorStats(pid, data)
        console.log("Final Stats", stats);
        self.setStats(stats)
      } else {
        console.log('error', err)
         self.setStats({"%CPU":"","%MEM":""})
      }
    }
  );

}
setStats = (payload)=>{
  // console.log("Playload: ",payload.app_name);
  const name=payload.app_name
  // const newData =  {...this.state.AllStats, [name]:payload};
  const newData = [name]:payload};
  // console.log("newData:",newData);
  // this.setState({AllStats: newData });
  this.props.update_all_stats(newData);
  console.log("STATE: ", this.state);
}

//////////////////////

  getInstalledApps=()=>{
    let self = this;
    cmd.get(
      `hcadmin status`,
      function(err, data, stderr) {
        if (!err) {
          console.log('/.holochain contains these files :\n>>', data)
          // self.setState({
          //   installed_apps: manageAllApps(data)
          // });
          self.props.update_installed_apps(manageAllApps(data)); // redux action call
          console.log("Apps state: ", self.state)
        } else {
          console.log('error', err)
        }

      }
    );
  };

  getDownloadedApps=()=>{
    let self = this;
    cmd.get(
      `cd ~/.hcadmin/holochain-download && ls`,
      function(err, data, stderr) {
        if (!err) {
          console.log('~/.hcadmin/holochain-download contains these files :\n>>', data)
          // self.setState({
          //   downloaded_apps: manageAllDownloadedApps(data)
          // });
          self.props.update_downloaded_apps(manageAllDownloadedApps(data));
          console.log("Apps state: ", self.state)
        } else {
          console.log('error', err)
        }

      }
    );
  };

  renderStatusButton = (appName,status,running) => {
    const STOPBUTTON=(<button className="StopButton" type="button" onClick={e => this.stopApp(appName)}>Stop</button>);
    const STARTBUTTON=(<button className="StartButton" type="button" onClick={e => this.startApp(appName)}>Start</button>);
    if(running){
      return (STOPBUTTON)
    }else if (!running){
      if(status==="installed"){
        return (STARTBUTTON)
      }
    }
  }
  renderRunningButton = (appName,status, running) => {
    const INSTALLBUTTON=(<button className="InstallButton" type="button" onClick={e => this.installApp(appName)}>Install</button>);
    const UNINSTALLBUTTON=(<button className="InstallButton" type="button" onClick={e => this.uninstallApp(appName)}>Uninstall</button>);
    if (!running){
        if (status === "installed") {
          return UNINSTALLBUTTON
        } else if (status === 'uninstalled') {
          return INSTALLBUTTON
        }
    }
  }
  installApp = (appName) => {
    console.log("Install");
    // cmd.run(`hcadmin join ~/.hcadmin/holochain-download/` + appName + ' ' + appName);
    hcJoin(appName);
    // // TODO: remove once we put a listener for the necessary files
    setTimeout(this.componentDidMount(),9000000);
  }
  uninstallApp = (appName) => {
    console.log("Uninstall:");
    hcUninstall(appName)
    // TODO: remove once we put a listener for the necessary files
    this.componentDidMount();
  }
  startApp = (appName) => {
    console.log("Start:");
    // TODO: remove once we put a listener for the necessary files
    // Get the running ports
    const freePort = decideFreePort(this.props.AllStats)
    // Run through them and find the last port that is not used
    // use that port
     hcStart(appName,freePort);
     this.componentDidMount();
  }
  stopApp = (appName) => {
    console.log("Stop:");
    // TODO: remove once we put a listener for the necessary files
    hcStop(appName,this.props.AllStats)
    this.componentDidMount();
  }

  refresh = () => {
    this.componentDidMount();
  }

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;

    const { installed_apps,downloaded_apps,runningApps,AllStats } = this.props;
    const table_data= filterApps(installed_apps,downloaded_apps,runningApps, AllStats)
    console.log("Table Data: ",table_data);

    return (
      <div>
      <div  className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to HCAdmin-GUI</h2>
          <button className="InstallButton" type="button" onClick={e => this.refresh()}>Refresh</button>
        </div>
        <AdvancedExpandReactTable
          data={table_data}
          columns={columns}
          defaultPageSize={20}
          className="-striped -highlight"
          SubComponent={({ row, nestingPath, toggleRowSubComponent }) => {
            if(row._original.bridgedFrom!==undefined){
              return (
                <div style={{ padding: "20px" }}>
                    Bridged From | Token {row._original.bridgedFrom.token}
                    <br/>
                    {this.renderStatusButton(row._original.appName,row._original.status,row._original.running)}
                    {this.renderRunningButton(row._original.appName,row._original.status,row._original.running)}
                </div>
              );
            }else if (row._original.bridgedTo!==undefined) {
              return (
                <div style={{ padding: "20px" }}>
                    Bridged To | Apps Name:  {row._original.bridgedTo.name} | App DNA: {row._original.bridgedTo.dna}
                    <br/>
                    {this.renderStatusButton(row._original.appName,row._original.status,row._original.running)}
                    {this.renderRunningButton(row._original.appName,row._original.status,row._original.running)}
                </div>
              );
            }
            else{
              return (
                <div style={{ padding: "20px" }}>
                    No Bridges
                    <br/>
                    {this.renderStatusButton(row._original.appName,row._original.status,row._original.running)}
                    {this.renderRunningButton(row._original.appName,row._original.status,row._original.running)}
                </div>);
            }


          }}
        />
      </div>
      </div>
    );
  }
}

/*Data for table*/
const columns = [{
      Header: 'App',
      columns: [{
        Header: 'App Name',
        accessor: 'appName'
      }, {
        Header: 'DNA',
        id: 'dna',
        accessor: d => d.dna
      }]
    }, {
      Header: 'Stats',
      columns: [{
        Header: 'CPU %',
        accessor: 'CPU%',
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
        Header: 'MEM %',
        accessor: 'MEM%',
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
      },{
        Header: 'PortNumber',
        accessor: 'portNumber',
        Cell: row => (
          <span>
            <span style={{
              color: row.value !== '-' ? '#57d500'
                : '#ff2e00',
              transition: 'all .3s ease'
            }}>
              &#x25cf;
            </span> {
              row.value
            }
          </span>
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
      },{
        Header: 'Running',
        accessor: 'running',
        Cell: row => (
          <span>
            <span style={{
              color: row.value === true ? '#57d500'
                : row.value === false ? '#ff2e00'
                : '#ffbf00',
              transition: 'all .3s ease'
            }}>
              &#x25cf;
            </span> {
              row.value === true ? `Running`
              : row.value === false ? `Stopped`
              : 'Unknown'
            }
          </span>
        )
      }]
    }];

const mapStateToProps = ({ downloaded_apps, installed_apps, runningApps, lastPortUsed, AllStats }) => ({
  downloaded_apps, installed_apps, runningApps, lastPortUsed, AllStats
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    update_downloaded_apps,
    update_installed_apps,
    update_running_apps,
    update_last_port,
    update_all_stats
   }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
