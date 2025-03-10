function normalize(value, min, max) {
  // En los casos en los que solo es una ciudad min y max
  // son el mismo valor con lo que esta función da NaN
  // por eso devolvemos sin más 1.
  if (min === max) {
    return 1;
  } else {
    return (value - min) / (max - min);
  }
}

export function calculateSize(
  totalevents,
  zoom,
  minTotalevents,
  maxTotalevents,
  scaleFactor,
) {
  const normalizedValue = normalize(
    totalevents,
    minTotalevents,
    maxTotalevents,
  );

  /*
    The trick is the folowing:
    with Math.max we return a mininum value of 5 if the result of the
    calculation is < 5. The min pixels are therefore 5.

    With Math.pow() we create a scale factor.

    Be aware that the normalizedValue is 0-1. 
  */

  return Math.max(5, normalizedValue * Math.pow(2.1, zoom));
}
