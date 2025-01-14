import { useCallback, useState } from 'react';
import { isMovieError } from '@/lib/utils';
import { getTrendingMovies, searchMovies } from '@/services/movie/movieSvc';
import { MovieResponse } from '@/services/movie/types';

interface UseMoviesResult {
  movies: MovieResponse | null;
  loading: boolean;
  error: string | null;
  fetchTrendingMovies: (page: number) => Promise<void>;
  fetchSearchMovies: (query: string, page: number) => Promise<void>;
  reset: () => void;
}

export const useMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingMovies = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrendingMovies(page);
      setMovies(data);
    } catch (err) {
      if (err instanceof Error || isMovieError(err)) {
        setError(err.message);
      } else {
        setError('Error fetching trending movies.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSearchMovies = useCallback(async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, page);
      setMovies(data);
    } catch (err) {
      if (err instanceof Error || isMovieError(err)) {
        setError(err.message);
      } else {
        setError('Error searching movies.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMovies(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    movies,
    loading,
    error,
    fetchTrendingMovies,
    fetchSearchMovies,
    reset
  };
};
