import { Metadata } from 'next';
import WatchClient from '@/components/watch/WatchClient';
import MobileWrapper from '@/components/layout/MobileWrapper';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { decodeData } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const q = (query.q as string) || '';
  const title = q ? decodeData(q) : ((query.title as string) || 'Drama');
  
  return {
    title: `Watch ${title} | Nongton`,
    description: 'Watch your favorite short dramas',
  };
}

export default async function WatchPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  
  const q = (query.q as string) || '';
  const title = q ? decodeData(q) : ((query.title as string) || 'Drama');

  // Instant render dengan data dari URL Query
  const initialDramaDetail = {
    bookId: id,
    bookName: title,
    cover: undefined // Removed cover from URL for cleaner look
  };

  return (
    <WatchClient 
      dramaId={id}
      initialEpisodes={[]} // Fetch di client
      initialDramaDetail={initialDramaDetail}
    />
  );
}
