import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Contract from '../contract/Contract';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class ContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractForm: {},
      disableSubmit: false,
      contract: {
        address: '',
        amount: 0,
        showContract: false,
        vendorfield: '',
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

    console.log(this.state);

    if (!isNaN(amount) && receive && send) {
      axios.post(`/${this.props.coin}`, { amount, receive, send })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          this.setState({
            ...this.state,
            error: '',
            contract: {
              address: res.data.address,
              amount: res.data.amount,
              receive: res.data.receive,
              showContract: true,
              vendorField: res.data.vendorField,
            }
          });
        }
        else {
          this.setState({
            ...this.state,
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
    const { coin = '' } = this.props;
    const { disableSubmit = false, error = '' } = this.state;
    const { showContract, address, amount, receive, vendorField } = this.state.contract;

    return (
      <div>
        {
          coin ?
            <div className="row">
              <h2 className="text-center col-sm-12 text-uppercase red-text py-4 px-3">Step 2: Create a Contract</h2>
              <div className="col-md-6 offset-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <h3 className="dark-grey-text text-center">
                        <strong>Create an Ark Contract</strong>
                      </h3>
                      {
                        (coin) ? <h4 className="text-center">{coin}</h4> : null
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
                        <label htmlFor="send">Your Ark address</label>
                      </div>
                      <div className="md-form">
                        <i className="fa fa-address-book prefix grey-text" />
                        <input type="text" id="receive" name="receive"  className="form-control" onChange={(e) => {this.handleChange(e);}} />
                        <label htmlFor="receive">Your {coin} address</label>
                      </div>
                      <div className="md-form">
                        <i className="fa fa-shopping-bag prefix grey-text" />
                        <input type="text" id="amount" name="amount"  className="form-control" onChange={(e) => {this.handleChange(e);}} />
                        <label htmlFor="amount">Amount of {coin} you want</label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={(disableSubmit) ? 'disabled' : ''}>Create Ark Contract</button>
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
            <Contract address={address} amount={amount} coin={coin} receive={receive} vendorField={vendorField} />
          </div>
          : null
        }
      </div>
    );
  }
}

ContractForm.propTypes = {
  coin: PropTypes.string,
};

export default ContractForm;
