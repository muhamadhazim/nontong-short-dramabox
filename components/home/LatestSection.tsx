import ModernDramaCard from "@/components/shared/ModernDramaCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import { DramaCard } from "@/types/drama";

interface LatestSectionProps {
  dramas: DramaCard[];
}

export default function LatestSection({ dramas }: LatestSectionProps) {
  if (dramas.length === 0) return null;

  return (
    <section className="mb-7 animate-fade-in-delay">
      <Container size="lg">
        <SectionHeader 
          icon={Sparkles} 
          title="New Releases"
          action={
            <Button 
              variant="ghost" 
              size="sm"
              className="text-nongton-gray hover:text-nongton-red"
            >
              View All →
            </Button>
          }
        />
      </Container>

      <Container size="lg" noPadding>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
          {dramas.map((drama) => (
            <ModernDramaCard
              key={drama.id}
              id={drama.id}
              title={drama.title}
              cover={drama.cover}
              rating={drama.rating}
              episodes={drama.episodes}
              duration={drama.duration}
              isNew={drama.isNew}
              size="medium"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
