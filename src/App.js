
import React, { Component } from 'react';
import logo from './holo-logo.svg';
import './App.css';
import PropTypes from "prop-types";
import { render } from "react-dom";
// import _set from "lodash.set";
// import _get from "lodash.get";
import { makeData, Logo, Tips } from "./utils/Utils";
import { advancedExpandTableHOC } from "./components/advancedExpandTableHOC";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: makeData()
    };
  }
  render() {
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
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={({ row, nestingPath, toggleRowSubComponent }) => {
            return (
              <div style={{ padding: "20px" }}>
                <button
                  onClick={e => toggleRowSubComponent({ nestingPath }, e)}
                >
                  Bridged-Apps {row.firstName} {row.lastName}
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
        accessor: 'firstName'
      }, {
        Header: 'Author Name',
        id: 'lastName',
        accessor: d => d.lastName
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
              color: row.value === 'relationship' ? '#ff2e00'
                : row.value === 'complicated' ? '#ffbf00'
                : '#57d500',
              transition: 'all .3s ease'
            }}>
              &#x25cf;
            </span> {
              row.value === 'relationship' ? 'In a relationship'
              : row.value === 'complicated' ? `It's complicated`
              : 'Single'
            }
          </span>
        )
      }]
    }];

export default App;
