export const formatDuration = (length: number): string => {
  if (!length || length === 0) return "Не указана";

  const hours = Math.trunc(length / 60);
  const minutes = length % 60;

  return `${hours > 0 ? hours + " ч." : ""} ${
    minutes > 0 ? minutes + " мин." : ""
  }`;
};
