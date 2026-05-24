import { useCallback, useState } from 'react';
import Hero from '@/components/hero';
import Navigation from '@/components/navigation';
import SearchBoxLg from '@/components/search-box-lg';
import CategorySidebar from '@/components/category-sidebar';
import ProjectGallery from '@/components/project-gallery';
import ProjectDetailDrawer from '@/components/project-detail-drawer';
import SearchBarSm from '@/components/search-bar-sm';
import Footer from '@/components/footer';

export default function App() {
  const [searchBoxVisible, setSearchBoxVisible] = useState(true);
  const handleVisibilityChange = useCallback((visible: boolean) => {
    setSearchBoxVisible(visible);
  }, []);

  return (
    <>
      <Navigation showSearch={!searchBoxVisible} />
      <Hero />
      <section className="mx-auto max-w-6xl px-container-px py-8 md:px-container-px-md">
        <div className="flex gap-layout-gap">
          <CategorySidebar />
          <div className="min-w-0 flex-1">
            <SearchBoxLg onVisibilityChange={handleVisibilityChange} />
            <ProjectGallery />
          </div>
        </div>
      </section>
      <Footer />
      <SearchBarSm />
      <ProjectDetailDrawer />
    </>
  );
}
