import React, { Component } from 'react';
import axios from 'axios';
import CoinDescription from './coin/CoinDescription';
import ContractForm from './contractForm/ContractForm';
import Pending from './pending/Pending';
import './App.css';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capacity: {},
      contracts: [],
      channel: '',
      coin: '',
      contractForm: {},
      fees: {
        flatFee: 0,
        percentFee: 0,
      },
      prices: {},
      showModal: false,
    }
  }

  modalClose = () => {
    this.setState({
      showModal: false,
    });
  }

  modalOpen = () => {
    this.setState({
      showModal: true,
    });
  }

  componentDidMount() {
    this.getPrices();
    this.getCapacity();
  }

  getPrices = () => {
    axios.get(`//${process.env.REACT_APP_API_HOST}/api/prices`)
      .then(res => {
        this.setState({
          channel: res.data.channel,
          fees: {
            flatFee: res.data.fees.flatFee,
            percentFee: res.data.fees.percentFee,
          },
          prices: res.data.prices,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  getCapacity = () => {
    axios.get(`//${process.env.REACT_APP_API_HOST}/api/capacity`)
      .then(res => {
        this.setState({
          capacity: res.data,
        });
      });
  }

  handleCoinSelect = coin => {
    this.setState({
      coin,
    });
  }

  render() {
    const flatFee = (this.state.fees.flatFee) ? this.state.fees.flatFee : '-';
    const percentFee = (this.state.fees.percentFee) ? this.state.fees.percentFee : '-';
    return (
      <div className="App">
        <div className="view full-page-intro">
          <div className="d-flex justify-content-center align-items-center">
            <div className="container full-page-container">
              <div className="row">
                <div className="col-md-6 mb-4 white-text text-center text-md-left">

                  <img
                    alt="PythACES logo"
                    className="pull-left"
                    style={{
                      height: '3.9rem',
                      margin: '0 1rem 0 0',
                    }}
                    src="/img/redbadge.png"
                  />

                  <h1 className="display-4 font-weight-bold">PythACES</h1>
                </div>
                <div className="col-md-6 mb-4 white-text text-center text-md-right">
                  <h2>Fees</h2>
                  <p>{flatFee} &#1126; + {percentFee}%</p>
                </div>
              </div>

              <hr className="hr-light" />

              <h2 className="text-center text-uppercase red-text py-4 px-3">Step 1: Select a Coin</h2>

              <CoinDescription coins={this.state.capacity} prices={this.state.prices} handleCoinSelect={this.handleCoinSelect} selected={this.state.coin} />

              <ContractForm channel={this.state.channel} coin={this.state.coin} />

              <Pending />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
