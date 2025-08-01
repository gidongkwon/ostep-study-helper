import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChapterView } from './components/ChapterView';
import { ProgressChart } from './components/ProgressChart';
import { getChapterById } from './data/curriculum';

function App() {
  const { t } = useTranslation();
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'chapters'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedChapter = selectedChapterId ? getChapterById(selectedChapterId) : null;

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setViewMode('chapters');
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none`}>
          <Sidebar 
            selectedChapter={selectedChapterId} 
            onChapterSelect={handleChapterSelect}
          />
        </div>
        
        <main className="flex-1 flex flex-col">
          <div className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="px-4 sm:px-6 py-4 flex space-x-1 sm:space-x-2 overflow-x-auto">
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                  viewMode === 'dashboard'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm sm:text-base">{t('sidebar.dashboard')}</span>
              </button>
              <button
                onClick={() => setViewMode('chapters')}
                className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                  viewMode === 'chapters'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm sm:text-base">{t('sidebar.allChapters')}</span>
              </button>
            </div>
          </div>
          
          {viewMode === 'dashboard' ? (
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
              <div className="max-w-6xl mx-auto">
                <ProgressChart />
              </div>
            </div>
          ) : selectedChapter ? (
            <ChapterView chapter={selectedChapter} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
              <div className="text-center">
                <svg className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
                  {t('chapter.readyToStart', 'Ready to start studying?')}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
                  {t('chapter.selectChapter', 'Select a chapter from the sidebar to begin your OS learning journey')}
                </p>
                <button
                  onClick={() => setViewMode('dashboard')}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>{t('sidebar.dashboard')}</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;