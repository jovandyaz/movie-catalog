import { DEFAULT_PAGE, VISIBLE_PAGES } from './constants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number
): Array<string | number> => {
  if (totalPages <= DEFAULT_PAGE) return [];

  if (totalPages <= VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | string> = [];
  const BUFFER = Math.floor(VISIBLE_PAGES / 2);

  let start = Math.max(1, currentPage - BUFFER);
  let end = Math.min(totalPages, start + VISIBLE_PAGES - 1);

  if (end === totalPages) {
    start = Math.max(1, end - VISIBLE_PAGES + 1);
  }

  if (start === 1) {
    end = Math.min(totalPages, VISIBLE_PAGES);
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};

interface MovieError {
  message: string;
}

export const isMovieError = (error: unknown): error is MovieError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as MovieError).message === 'string'
  );
};
