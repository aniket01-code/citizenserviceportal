import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, languageNames } from '@/i18n/translations';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const languages: Language[] = ['en', 'hi', 'mr', 'ta'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="lg" 
          className="touch-target gap-2 font-medium"
        >
          <Globe className="h-5 w-5" />
          <span className="hidden sm:inline">{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`touch-target cursor-pointer text-base ${
              language === lang ? 'bg-accent font-semibold' : ''
            }`}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
