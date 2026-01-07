import Hero from '@/components/hero';
import Navigation from '@/components/navigation';
import SearchBox from '@/components/search-box';
import ProjectGallery from '@/components/project-gallery';
import Footer from '@/components/footer';

export default function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <SearchBox />
      <ProjectGallery />
      <Footer />
    </>
  );
}
