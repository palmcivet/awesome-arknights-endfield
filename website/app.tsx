import Hero from '@/components/hero';
import Navigation from '@/components/navigation';
import SearchBox from '@/components/search-box';
import CategorySidebar from '@/components/category-sidebar';
import ProjectGallery from '@/components/project-gallery';
import ProjectDetailDrawer from '@/components/project-detail-drawer';
import Footer from '@/components/footer';

export default function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <SearchBox />
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex gap-8">
          <CategorySidebar />
          <div className="min-w-0 flex-1">
            <ProjectGallery />
          </div>
        </div>
      </section>
      <Footer />
      <ProjectDetailDrawer />
    </>
  );
}
