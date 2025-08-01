# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OSTEP Study Helper is a React/TypeScript web application for tracking progress through the "Operating Systems: Three Easy Pieces" (OSTEP) textbook. The app is built with Vite, uses Tailwind CSS for styling, and localStorage for data persistence.

## Directory Structure

The main application lives in `ostep-study-helper/`:
- `src/components/` - React components (ChapterView, Sidebar, WeeklyView, etc.)
- `src/data/curriculum.ts` - Chapter definitions and weekly schedule data
- `src/hooks/` - Custom React hooks (useStudyProgress, useTheme)
- `src/services/storage.ts` - localStorage management service
- `src/types/index.ts` - TypeScript type definitions

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linter
pnpm run lint

# Preview production build
pnpm preview
```

## Architecture

### Data Flow
- **StorageService**: Manages localStorage operations for progress tracking and theme preferences
- **useStudyProgress hook**: Provides state management for chapter progress, notes, and statistics
- **useTheme hook**: Handles dark/light theme switching

### Key Components
- **App.tsx**: Main layout with sidebar, header, and view routing (dashboard/chapters/weekly)
- **ChapterView**: Individual chapter display with progress tracking and notes editing
- **WeeklyView**: Shows chapters organized by weekly curriculum schedule
- **Sidebar**: Chapter navigation organized by sections (intro, virtualization, concurrency, persistence)

### Data Structure
- **Chapter**: Contains id, title, PDF links (English/Korean), section, and order
- **ChapterProgress**: Tracks status (not-started/in-progress/completed), notes, and last updated timestamp
- **StudyData**: Contains progress records and theme preference, persisted to localStorage

## Notes
- The app supports bilingual PDF links for each chapter (English and Korean)
- Progress is automatically saved to localStorage on any status change