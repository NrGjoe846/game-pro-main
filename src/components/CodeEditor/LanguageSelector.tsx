import React from 'react';
import type { Language } from './types';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
}) => {
  const languages: Language[] = ['javascript', 'python', 'java'];

  return (
    <select
      value={language}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang} className="bg-[#1a1a2e]">
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;