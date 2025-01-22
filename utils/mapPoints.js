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
  return normalizedValue * scaleFactor * zoom;
}
