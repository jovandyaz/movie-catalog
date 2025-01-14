import { MovieCard } from '@/components';
import { Movie } from '@/lib/types';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onMovieClick: (movie: Movie) => void;
}

export const MovieGrid = ({ movies, isLoading, onMovieClick }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
      ))}
    </div>
  );
};
