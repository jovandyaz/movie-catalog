'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--foreground)] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--foreground)] shadow-lg rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-4 py-2 transition-colors"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-4 py-2 transition-colors"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-4 py-2 transition-colors"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
