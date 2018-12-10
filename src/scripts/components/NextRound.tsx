import * as React from 'react';

interface Props {
  remainingBlocks: number;
}

// const MIN_BLOCK_TIME = 3; // SECONDS
const MAX_BLOCK_TIME = 30; // SECONDS

export default class NextRound extends React.Component<Props, any> {

  render() {
    const { remainingBlocks } = this.props;

    const minuesRemaining = Math.ceil((MAX_BLOCK_TIME * remainingBlocks) / (60));
    const hoursRemaining = Math.ceil((MAX_BLOCK_TIME * remainingBlocks) / (60 * 60));
    const daysRemaining = Math.ceil((MAX_BLOCK_TIME * remainingBlocks) / (60 * 60 * 24));
    const weeksRemaining = Math.ceil((MAX_BLOCK_TIME * remainingBlocks) / (60 * 60 * 24 * 7));

    let remainingStr = `${minuesRemaining} minutes`;
    if (weeksRemaining > 0) {
      remainingStr = `${weeksRemaining} weeks`;
    } else if (daysRemaining > 0) {
      remainingStr = `${daysRemaining} days`;
    } else if (hoursRemaining > 0) {
      remainingStr = `${hoursRemaining} hours`;
    }

    return (
      <div className='next-round'>
        <div>
          <div className='clock-logo'/>
          <div>{'Next round in'}</div>
        </div>
        <div>
          <div>{'About ${remainingStr}'}</div>
          <div className='remaining-blocks'>{`${remainingBlocks} Blocks`}</div>
        </div>
      </div>
    );
  }
}
