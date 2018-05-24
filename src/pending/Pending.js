import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Contract from '../contract/Contract';
import Timer from '../timer/Timer';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

const apiUrl = (process.env.REACT_APP_API_HOST !== undefined) ? `//${process.env.REACT_APP_API_HOST}` : '';

class Pending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contracts: [],
      contract: {
        channel: '',
        coin: '',
        receivingAddress: '',
        receivingAmount: 0,
        sendingAddress: '',
        sendingAmount: 0,
        serviceAccount: '',
        vendorField: '',
      }
    }
  }

  componentDidMount() {
    this.getContracts();
  }

  showContract = (contract) => {
    this.setState({
      contract: {
        channel: contract.channel,
        coin: contract.coin,
        receivingAddress: contract.receivingAddress,
        receivingAmount: contract.receivingAmount,
        sendingAddress: contract.sendingAddress,
        sendingAmount: contract.sendingAmount,
        serviceAccount: contract.serviceAccount,
        vendorField: contract.contract,
      }
    });
  }

  getContracts = () => {
    axios.get(`${apiUrl}/api/contracts`)
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
            <span className="mobile-label">Sending Address:</span>
            <button
              aria-label={`Show contract for ${contract.sendingAddress}`}
              className="btn btn-primary btn-small truncate"
              data-toggle="modal"
              data-target="#contractModal"
              onClick={() => {this.showContract(contract);}}>{contract.sendingAddress}</button>
          </th>
          <td>
            <span className="mobile-label">Status:</span>
            {contract.contractStatus}
          </td>
          <td>
            <span className="mobile-label">Time Left:</span>
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
          <div className="modal fade" id="contractModal" tabIndex={-1} role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalTitle">Pay This Contract</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-center">
                  <Contract
                    address={this.state.contract.serviceAccount}
                    amount={this.state.contract.sendingAmount}
                    channel={this.state.contract.channel}
                    coin={this.state.contract.coin}
                    receive={this.state.contract.receivingAmount}
                    vendorField={this.state.contract.vendorField}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="dark-grey-text text-center"><strong>Contracts</strong></h3>
                <hr />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sending Address</th>
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
