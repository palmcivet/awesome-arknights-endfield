import { Github, ArrowRight } from 'lucide-react';
import { ARKNIGHTS_REPO_URL, ENDFIELD_REPO_URL } from '@/shared/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mt-12 flex flex-row justify-between items-center gap-6 border-t pt-8 text-center text-sm">
          <span className="text-muted-foreground">
            © {currentYear} Awesome Arknights Endfield
          </span>

          <div className="flex items-center gap-8">
            <a
              href={ENDFIELD_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={ARKNIGHTS_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Awesome Arknights <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
