import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './context/language-context';
import { ThemeProvider } from './context/theme-context';
import { ProjectProvider } from './context/project-context';
import { DrawerProvider } from './context/drawer-context';
import App from './app';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <ProjectProvider>
          <DrawerProvider>
            <App />
          </DrawerProvider>
        </ProjectProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
