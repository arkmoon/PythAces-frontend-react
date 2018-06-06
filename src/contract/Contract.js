import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qr-svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import Timer from '../timer/Timer';

import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

import './ContractStyle.css';

class Contract extends Component {
  render() {
    const {
      address = '',
      amount = 0,
      channel = '',
      coin = '',
      createdOnTimestamp = 0,
      receive = 0,
      vendorField = '',
    } = this.props;

    const optionalVendorField = (vendorField !== '') ? `&vendorField=${vendorField}` : '';
    const aipAddress = `${channel}:${address}?&amount=${amount}${optionalVendorField}`;

    return (
      (coin !== '') ?
        <div className="col-sm-12 mb-4 text-center">
          <div className="card">
            <div className="card-body">
              <div className="avatar white">
                <img src={`/img/${coin}-logo.png`} className="img-responsive mx-auto contract-logo" alt={`${coin} logo`} />

                {
                  (createdOnTimestamp) ? <div>Expires in:<br /><Timer created={createdOnTimestamp} /></div> : null
                }
              </div>
              <div className="card-body">
                <h3 className="card-title">{`Receive ${receive} ${coin}`}</h3>
                <hr />
                  <div className="md-form ml-0 mr-0">
                    <a href={aipAddress}>

                    <QRCode
                      level="Q"
                      style={{ width: 256 }}
                      value={aipAddress}
                    />

                    </a>

                    <div className="text-left">
                      <div className="list-group list-group-flush">
                        <p className="list-group-item"><b>{`Send ${amount} ${channel} to:`}</b></p>
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

                        {
                          (vendorField !== '') ?
                            <div>
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
                           : null
                        }
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
  channel: PropTypes.string,
  coin: PropTypes.string,
  createdOnTimestamp: PropTypes.number,
  receive: PropTypes.number,
  vendorField: PropTypes.string,
};

export default Contract;
