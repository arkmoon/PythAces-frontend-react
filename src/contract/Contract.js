import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArkQrCode from 'ark-qrcode-react';
import CopyToClipboard from 'react-copy-to-clipboard';

import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

import './ContractStyle.css';

class Contract extends Component {
  render() {
    const {
      address = '',
      amount = 0,
      coin = '',
      receive = 0,
      vendorField = '',
    } = this.props;

    return (
      (coin !== '') ?
        <div className="col-md-6 offset-md-3 mb-4 text-center">
          <div className="card">
            <div className="card-body">
              <div className="avatar mx-auto white">
                <img src={`/img/${coin}-logo.png`} className="rounded-circle img-responsive" alt={`${coin} logo`} />
              </div>
              <div className="card-body">
                <h3 className="card-title">{`Receive ${receive} ${coin}`}</h3>
                <hr />
                  <div className="md-form ml-0 mr-0">
                    <a href={`ark:${address}?&amount=${amount}&vendorField=${vendorField}`}>
                      <ArkQrCode
                        address={address}
                        amount={amount}
                        label=""
                        showLogo={true}
                        size={200}
                        vendorField={vendorField} />
                    </a>

                    <div className="text-left">
                      <div className="list-group list-group-flush">
                        <p className="list-group-item"><b>Send {amount} Ark to:</b></p>
                        <span className="list-group-item">
                          <CopyToClipboard text={address}>
                            <span>
                              <span className="badge badge-success waves-effect badge-pill pull-right">
                                <i className="fa fa-clipboard p-1">
                                  <span className="sr-only">Copy Send Address to Clipboard</span>
                                </i>
                              </span>
                            </span>
                          </CopyToClipboard>
                          <span>{address}</span>
                        </span>
                        <p className="list-group-item"><b>With this Smartbridge text:</b></p>
                        <span className="list-group-item">
                          <CopyToClipboard text={vendorField}>
                            <span>
                              <span className="badge badge-success waves-effect badge-pill pull-right">
                                <i className="fa fa-clipboard p-1">
                                  <span className="sr-only">Copy Send Address to Clipboard</span>
                                </i>
                              </span>
                            </span>
                          </CopyToClipboard>
                          <span>{vendorField}</span>
                        </span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      : null
    );
  }
}

Contract.propTypes = {
  address: PropTypes.string,
  amount: PropTypes.number,
  coin: PropTypes.string,
  receive: PropTypes.number,
  vendorField: PropTypes.string,
};

export default Contract;
