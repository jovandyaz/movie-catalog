'use client';

import { useCallback, useEffect, useState } from 'react';
import { ModeToggle, MovieGrid, MovieModal, Pagination, SearchBar } from '@/components';
import { Alert, AlertDescription } from '@/components/ui';
import { useMovies } from '@/hooks';
import { DEFAULT_PAGE_NUMBER } from '@/lib/constants';
import { Movie } from '@/lib/types/movie';

export default function Page() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [searchQuery, setSearchQuery] = useState('');

  const { movies, loading, error, fetchTrendingMovies, fetchSearchMovies } = useMovies();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(DEFAULT_PAGE_NUMBER);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          await fetchSearchMovies(searchQuery, page);
        } else {
          await fetchTrendingMovies(page);
        }
      } catch (error) {
        if (error instanceof Error) {
          return;
        }
        throw error;
      }
    };

    fetchData();
  }, [searchQuery, page, fetchTrendingMovies, fetchSearchMovies]);

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between mb-8 text-aling-center">
        <h1 className="text-3xl font-bold text-center flex-grow">
          {searchQuery ? 'Search Results' : 'Trending Movies'}
        </h1>
        <ModeToggle />
      </nav>

      <SearchBar onSearch={handleSearch} />
      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <MovieGrid
        movies={movies?.results || []}
        isLoading={loading}
        onMovieClick={setSelectedMovie}
      />
      {!loading && movies && movies.total_pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={movies?.total_pages || 0}
          onPageChange={handlePageChange}
        />
      )}

      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}
