export const formatDuration = (length) => {
  if (!length || length === 0) return null;

  const hours = Math.trunc(length / 60);
  const minutes = length % 60;

  return `${hours > 0 ? hours + " ч." : ""} ${
    minutes > 0 ? minutes + " мин." : ""
  }`;
};
