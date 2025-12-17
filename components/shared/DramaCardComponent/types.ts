export interface DramaCardProps {
  id: string;
  title: string;
  cover: string;
  showBadge?: boolean;
  rank?: number;
  variant?: "default" | "large";
}
