import * as React from 'react';

interface Props {
  remainingBlocks: number;
}

export default class NextRound extends React.Component<Props, any> {

  render() {
    const { remainingBlocks } = this.props;

    return (
      <div className='next-round'>
        <div className='description'>
          <div className='logo-clock'/>
          <div>{'Next round in:'}</div>
        </div>
        <div className='remaining-blocks'>{`${remainingBlocks} Blocks`}</div>
      </div>
    );
  }
}
