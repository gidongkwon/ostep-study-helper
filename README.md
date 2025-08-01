# OSTEP Study Helper

A web application to help track your progress through Operating Systems: Three Easy Pieces (OSTEP).

## Features

- **Progress Tracking**: Mark chapters as Not Started, In Progress, or Completed
- **Bilingual Support**: Direct links to both English and Korean PDF versions
- **Personal Notes**: Add and save notes for each chapter
- **Weekly Curriculum View**: See chapters organized by weekly schedule
- **Dark/Light Theme**: Toggle between themes for comfortable reading
- **Data Persistence**: All progress saved to localStorage
- **Export/Import**: Backup and restore your study progress
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
pnpm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Select a Chapter**: Click on any chapter from the sidebar
2. **Track Progress**: Use the status buttons to mark your progress
3. **Add Notes**: Click "Edit Notes" to add personal study notes
4. **View by Week**: Switch to Weekly View to see the curriculum schedule
5. **Export Progress**: Click Export to save your progress as a JSON file
6. **Import Progress**: Click Import to restore previously saved progress

## Technology Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- localStorage for data persistence