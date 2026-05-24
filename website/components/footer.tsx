import { ARKNIGHTS_REPOSITORY_URL, ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import { useI18nContext } from '@/i18n/i18n-react.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { LL } = useI18nContext();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-5 pb-sticky-offset sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-8 md:px-10 lg:pb-8">
        {/* Links */}
        <div className="flex items-center gap-6 sm:order-2">
          <a
            href={ENDFIELD_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech text-muted-foreground underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            GitHub
          </a>
          <a
            href={ARKNIGHTS_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech text-muted-foreground underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {LL.footer.awesomeArknights()}
          </a>
          <a
            href={`${ENDFIELD_REPOSITORY_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech text-muted-foreground underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {LL.footer.contribute()}
          </a>
        </div>

        {/* Copyright */}
        <div className="font-mono text-xs text-foreground/20 sm:order-1">
          &copy; {currentYear} Awesome Arknights Endfield
        </div>
      </div>
    </footer>
  );
}
