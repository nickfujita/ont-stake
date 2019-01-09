import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ClassNames from 'classnames';
import { numberWithCommas, formatPercent } from '../utils/numbers';

interface Props {
  dispatch: any;
}

class Unsupported extends React.Component<Props, any> {

  render() {
    return (
      <div className='unsupported'>
        <div className='luna-confused'/>
        <h2 className='title'>
          {'Oops, this platform is not yet supported.'}
        </h2>
        <div className='row'>
          {'The Ontology staking application is currently supported on O3 desktop, with support for mobile coming soon.'}
        </div>
        <div className='row'>
          {'If you would like manage your Ontology stakes, please download the latest O3 desktop application and access the Staketology app via the app browser.'}
        </div>
        <div
          className='primary-btn'
          onClick={() => {
            window.open('https://o3.network');
          }}
        >
          {'Download O3 Desktop App'}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Unsupported);
