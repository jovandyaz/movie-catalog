import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Movie } from '@/lib/types';
import { getImageUrl } from '@/services/movie/urls';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  if (!movie) return null;

  const posterUrl = movie.poster_path ? getImageUrl(movie.poster_path) : '/placeholder-movie.jpg';

  return (
    <Card
      className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg"
      onClick={() => onClick(movie)}
    >
      <CardHeader className="p-0.5 overflow-hidden">
        <Image
          className="w-full h-64 object-cover rounded-t-lg"
          src={posterUrl}
          alt={movie.title}
          layout="fixed"
          width={400}
          height={650}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 text-[var(--foreground)]">{movie.title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {movie.overview}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="text-sm">{new Date(movie.release_date).getFullYear()}</span>
          <span className="text-sm font-semibold">⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
