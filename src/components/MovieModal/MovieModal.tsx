import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Movie } from '@/lib/types';
import { getImageUrl } from '@/services/movie/urls';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  if (!movie) return null;

  const posterUrl = movie.poster_path ? getImageUrl(movie.poster_path) : '/placeholder-movie.jpg';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border-color)] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{movie.title}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[2/3]">
            <Image
              className="rounded-lg object-cover w-full h-full"
              src={posterUrl}
              alt={movie.title}
              layout="responsive"
              width={500}
              height={750}
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-[var(--foreground)] text-opacity-75">{movie.overview}</p>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span>
                <h4 className="font-semibold">Release Date</h4>
                <p className="text-[var(--foreground)] text-opacity-75">
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
              </span>
              <span>
                <h4 className="font-semibold">Rating</h4>
                <p className="text-[var(--foreground)] text-opacity-75">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
