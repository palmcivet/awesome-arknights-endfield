import { ARKNIGHTS_REPOSITORY_URL, ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import { useI18nContext } from '@/i18n/i18n-react.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { LL } = useI18nContext();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-container-px md:px-container-px-md flex flex-col items-center gap-3 py-5 pb-sticky-offset sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8 lg:pb-8">
        {/* Links */}
        <nav className="flex items-center gap-6 sm:order-2" aria-label="Footer">
          <a
            href={ENDFIELD_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech text-muted-foreground underline decoration-border underline-offset-2 transition-[color,text-decoration-color] hover:text-foreground hover:decoration-foreground"
          >
            GitHub
            <span className="sr-only"> {LL.a11y.openInNewTab()}</span>
          </a>
          <a
            href={ARKNIGHTS_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech text-muted-foreground underline decoration-border underline-offset-2 transition-[color,text-decoration-color] hover:text-foreground hover:decoration-foreground"
          >
            {LL.footer.awesomeArknights()}
            <span className="sr-only"> {LL.a11y.openInNewTab()}</span>
          </a>
          <a
            href={`${ENDFIELD_REPOSITORY_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech text-muted-foreground underline decoration-border underline-offset-2 transition-[color,text-decoration-color] hover:text-foreground hover:decoration-foreground"
          >
            {LL.footer.contribute()}
            <span className="sr-only"> {LL.a11y.openInNewTab()}</span>
          </a>
        </nav>

        {/* Copyright */}
        <div className="font-mono text-xs text-foreground/60 sm:order-1">
          &copy; {currentYear} Awesome Arknights Endfield
        </div>
      </div>
    </footer>
  );
}
