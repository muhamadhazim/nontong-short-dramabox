import { DramaCardLarge } from "./DramaCardLarge";
import { DramaCardRanked } from "./DramaCardRanked";
import { DramaCardStandard } from "./DramaCardStandard";
import { DramaCardProps } from "./types";

export default function DramaCard(props: DramaCardProps) {
  const { variant = "default", rank } = props;

  // 1. Large variant for Latest Releases
  if (variant === "large") {
    return <DramaCardLarge {...props} />;
  }

  // 2. Top 10 variant with ranking
  if (rank) {
    return <DramaCardRanked {...props} />;
  }

  // 3. Default variant (For You section)
  return <DramaCardStandard {...props} />;
}
