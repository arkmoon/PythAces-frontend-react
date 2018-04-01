import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

const fixedPoint = Math.pow(10, 8);

class CoinDescription extends Component {
  render() {
    const { coins, handleCoinSelect, prices, selected } = this.props;

    return (
      <div className="row text-center home-card">
        {
          Object.keys(coins).map(key => {

            const price = (prices[key] !== undefined) ? prices[key] : '-';
            const available = (coins[key] !== undefined) ? coins[key].availableCapacity / fixedPoint : '-';
            const reserved = (coins[key] !== undefined) ? coins[key].reservedCapacity / fixedPoint : '-';
            return (
              <div key={key} className="col-lg-6 col-md-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h2>
                      <strong>{key}</strong>
                      <img
                        alt={`${key} logo`}
                        className="rounded-circle img-fluid pull-left"
                        src={`/img/${key}-logo.png`}
                      />
                    </h2>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title pricing-card-title mb-4">&#1126; {price} / ea.</h3>
                    <ol className="list-unstyled mb-4">
                      <li>
                        Available: {available}
                        <i className="fa fa-check green-text ml-1" />
                      </li>
                      <hr />
                      <li>Reserved: {reserved}
                        <i className="fa fa-ban red-text ml-1" />
                      </li>
                    </ol>
                    <button
                      type="button"
                      className="btn btn-lg btn-block btn-primary waves-effect waves-light"
                      name="dkapu"
                      onClick={() => {handleCoinSelect(key);}}>Select {key}{(key === selected) ? ' (selected)' : ''}</button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

CoinDescription.propTypes = {
  coins: PropTypes.object.isRequired,
  handleCoinSelect: PropTypes.func.isRequired,
  prices: PropTypes.object.isRequired,
  selected: PropTypes.string,
};

export default CoinDescription;

