import * as React from 'react';
import ClassNames from 'classnames';
import { numberWithCommas, formatPercent } from '../utils/numbers';

interface StakeDistroPortionInput {
  className?: string;
  color: string;
  label: string;
  amount: number;
  percentage: string;
}

export default function StakeDistroPortion ({
  className,
  color,
  label,
  amount,
  percentage,
}: StakeDistroPortionInput) {
  if (typeof percentage === 'number') {
    percentage = formatPercent(percentage);
  }

  return (
    <div className={ClassNames('stake-distro-portion', className)}>
      <div className={ClassNames('label', color)}>{label}</div>
      <div className='amount'>{`${numberWithCommas(amount)} (${percentage})`}</div>
    </div>
  );
}
