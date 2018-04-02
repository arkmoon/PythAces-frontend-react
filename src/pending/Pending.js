import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Timer from '../timer/Timer';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class Pending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contracts: [],
    }
  }

  componentWillMount() {
    this.getContracts();
  }

  getContracts = () => {
    axios.get(`/api/contracts`)
      .then(res => {
        this.setState({
          contracts: res.data,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    const { contracts = [] } = this.state;

    const contractRows = contracts.map(contract => {
      return (
        <tr key={contract.contract}>
          <th scope="row">
            <a href={`/api/history/${contract.contract}`}>{contract.contract}</a>
          </th>
          <td>{contract.contractStatus}</td>
          <td>
            {
              (contract.contractStatus !== 'Processed') ? <Timer created={contract.createdOnTimestamp} /> : 'N/A'
            }
          </td>
        </tr>
      );
    })

    return (
      (contracts !== undefined && contracts.length > 0) ?
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="dark-grey-text text-center"><strong>Contracts</strong></h3>
                <hr />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Contract ID</th>
                      <th>Status</th>
                      <th>Time Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    { contractRows }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      : null
    );
  }
}

Pending.propTypes = {
  contracts: PropTypes.array,
};

export default Pending;
