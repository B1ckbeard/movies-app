export const formatRatings = (rating, type = "long") => {
  if (type === "long") {
    const ratingParts = [];
    if (rating.imdb > 0) ratingParts.push(`IMDb: ${rating.imdb.toFixed(1)}/10`);
    if (rating.kp > 0)
      ratingParts.push(`КиноПоиск: ${rating.kp.toFixed(1)}/10`);
    return ratingParts.length > 0 ? ratingParts.join(" | ") : "нет оценок";
  } else {
    return rating.kp > 0
      ? `${rating.kp.toFixed(1)}/10`
      : rating.imdb > 0
      ? `${rating.imdb.toFixed(1)}/10`
      : "";
  }
};
