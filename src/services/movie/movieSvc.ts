import movieClient from './movieClient';
import { SEARCH_MOVIES_URL, TRENDING_MOVIES } from '@/services/movie/routes';
import { MovieResponse } from '@/services/movie/types';

export const getTrendingMovies = async (currentPage: number): Promise<MovieResponse> => {
  const data = await movieClient.get<MovieResponse>(TRENDING_MOVIES, {
    params: {
      page: currentPage
    }
  });
  return data;
};

export const searchMovies = async (query: string, currentPage: number): Promise<MovieResponse> => {
  const data = await movieClient.get<MovieResponse>(SEARCH_MOVIES_URL, {
    params: { query, page: currentPage }
  });
  return data;
};
