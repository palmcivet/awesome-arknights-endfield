import { lazy, Suspense, useCallback, useState } from 'react';
import Hero from '@/components/hero';
import Navigation from '@/components/navigation';
import SearchBoxLg from '@/components/search-box-lg';
import CategorySidebar from '@/components/category-sidebar';
import ProjectGallery from '@/components/project-gallery';
import SearchBarSm from '@/components/search-bar-sm';
import Footer from '@/components/footer';
import { useI18nContext } from '@/i18n/i18n-react.js';

const ProjectDetailDrawer = lazy(() => import('@/components/project-detail-drawer'));

export default function App() {
  const [searchBoxVisible, setSearchBoxVisible] = useState(true);
  const { LL } = useI18nContext();
  const handleVisibilityChange = useCallback((visible: boolean) => {
    setSearchBoxVisible(visible);
  }, []);

  return (
    <div className="min-w-xs">
      <a
        href="#gallery"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:border focus:border-border"
      >
        {LL.a11y.skipToContent()}
      </a>
      <Navigation showSearch={!searchBoxVisible} />
      <Hero />
      <main className="mx-auto max-w-6xl px-container-px py-8 md:px-container-px-md">
        <div className="flex gap-layout-gap">
          <CategorySidebar />
          <div id="gallery" className="min-w-0 flex-1">
            <SearchBoxLg onVisibilityChange={handleVisibilityChange} />
            <ProjectGallery />
          </div>
        </div>
      </main>
      <Footer />
      <SearchBarSm />
      <Suspense fallback={null}>
        <ProjectDetailDrawer />
      </Suspense>
    </div>
  );
}
