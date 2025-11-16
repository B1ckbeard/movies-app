import { Rating } from "@/interfaces";

interface Props {
  rating: Rating;
  type: "long" | "short";
}

export const formatRatings = ({ rating, type = "long" }: Props): string => {
  const imdb = rating.imdb || 0;
  const kp = rating.kp || 0;

  if (type === "long") {
    const ratingParts: string[] = [];
    if (imdb > 0) ratingParts.push(`IMDb: ${imdb.toFixed(1)}/10`);
    if (kp > 0) ratingParts.push(`КиноПоиск: ${kp.toFixed(1)}/10`);
    return ratingParts.length > 0 ? ratingParts.join(" | ") : "нет оценок";
  } else {
    return kp > 0
      ? `${kp.toFixed(1)}/10`
      : imdb > 0
      ? `${imdb.toFixed(1)}/10`
      : "";
  }
};
