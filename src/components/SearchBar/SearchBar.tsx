import { useEffect, useState } from 'react';
import { Input } from '@/components/ui';
import { useDebounce } from '@/hooks';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <Input
        type="search"
        placeholder="Search movies..."
        value={value}
        onChange={handleChange}
        className="w-full p-3 rounded-md border border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--foreground)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
};
