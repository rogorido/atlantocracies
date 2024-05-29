export function normalize(value, min, max) {
  return (value - min) / (max - min);
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
