import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { StudyProgressProvider } from './contexts/StudyProgressContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudyProgressProvider>
      <App />
    </StudyProgressProvider>
  </StrictMode>,
)
