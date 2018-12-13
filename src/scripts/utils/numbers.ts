export function numberWithCommas(x) {
  if (!x) {
    return 0;
  }

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatPercent(percentage) {
  if (!percentage) {
    return '0%';
  }

  return trimDecimalStr((percentage * 100).toFixed(2)) + '%';
}

function trimDecimalStr(numberSrt) {
  const parts = numberSrt.split('.');

  if (parts.length === 1) {
    return numberSrt;
  }

  if (Number(parts[1]) === 0) {
    return parts[0];
  }

  const trimmedDecimalString = parts[1].replace(/\.?0+$/, '');
  return `${parts[0]}.${trimmedDecimalString}`;
}
