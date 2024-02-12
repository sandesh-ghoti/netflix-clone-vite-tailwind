export default function precision(value) {
  if (value < 1000) {
    return value;
  } else if (value < 1000000) {
    return (value / 1000).toFixed(1) + "K";
  } else if (value < 1000000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value < 10000000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  } else {
    return (value / 10000000000000).toFixed(1) + "T";
  }
}
