import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Contract from '../contract/Contract';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

const apiUrl = (process.env.REACT_APP_API_HOST !== undefined) ? process.env.REACT_APP_API_HOST : 'pythaces.delegate-goose.biz';

class ContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractForm: {},
      disableSubmit: false,
      contract: {
        address: '',
        amount: 0,
        channel: '',
        receive: 0,
        showContract: false,
        vendorField: '',
      }
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      disableSubmit: false,
      contractForm: {
        ...this.state.contractForm,
        [e.target.name]: e.target.value,
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    // Amount must be a number.
    const amount = (this.state.contractForm.amount) ? parseInt(this.state.contractForm.amount, 10) : '';
    const receive = this.state.contractForm.receive;
    const send = this.state.contractForm.send;

    this.setState({
      ...this.state,
      disableSubmit: true,
    });

    if (!isNaN(amount) && receive && send) {
      axios.post(`//${apiUrl}/api/${this.props.coin}`, { amount, receive, send })
      .then(res => {
        if (res.data.success) {
          this.setState({
            ...this.state,
            error: '',
            contract: {
              address: res.data.address,
              amount: res.data.amount,
              channel: res.data.channel,
              receive: res.data.receive,
              showContract: true,
              vendorField: res.data.vendorField,
            }
          });
        }
        else {
          this.setState({
            ...this.state,
            contract: {
              address: '',
              amount: 0,
              channel: '',
              receive: 0,
              showContract: false,
              vendorField: '',
            },
            error: res.data.msg,
          });
        }
      })
      .catch(err => {
        console.log(err.response);
      });
    }
  }

  render() {
    const { channel = '', coin = '' } = this.props;
    const { disableSubmit = false, error = '' } = this.state;
    const { showContract, address, amount, receive, vendorField } = this.state.contract;

    return (
      <div>
        {
          coin ?
            <div className="row">
              <h2 className="text-center col-sm-12 text-uppercase red-text py-4 px-3">Step 2: Create a Contract</h2>
              <div className="col-sm-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      {
                        (coin) ? <h3 className="text-center">Receive {coin}</h3> : null
                      }
                      {
                        error ?
                        <div className="row">
                          <div className="col-sm-12 alert alert-danger" role="alert">
                            { error }
                          </div>
                        </div> : null
                      }
                      <hr />
                      <div className="md-form">
                        <i className="fa fa-address-book prefix grey-text" />
                        <input type="text" id="send" name="send" className="form-control" onChange={(e) => {this.handleChange(e);}} />
                        <label htmlFor="send">{`Your ${channel} address`}</label>
                      </div>
                      <div className="md-form">
                        <i className="fa fa-address-book prefix grey-text" />
                        <input type="text" id="receive" name="receive"  className="form-control" onChange={(e) => {this.handleChange(e);}} />
                        <label htmlFor="receive">{`Your ${coin} address`}</label>
                      </div>
                      <div className="md-form">
                        <i className="fa fa-shopping-bag prefix grey-text" />
                        <input type="text" id="amount" name="amount"  className="form-control" onChange={(e) => {this.handleChange(e);}} />
                        <label htmlFor="amount">Amount of {coin} you want</label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={(disableSubmit) ? 'disabled' : ''}>{`Generate ${channel} contract`}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            : null
        }

        {
          showContract ?
          <div className="row">
            <h2 className="text-center col-sm-12 text-uppercase red-text py-4 px-3">Step 3: Pay Your Contract</h2>
            <Contract address={address} amount={amount} channel={channel} coin={coin} receive={receive} vendorField={vendorField} />
          </div>
          : null
        }
      </div>
    );
  }
}

ContractForm.propTypes = {
  channel: PropTypes.string,
  coin: PropTypes.string,
};

export default ContractForm;
