import React, { useState } from 'react';
import { Settings, Moon, Sun, Volume2, Bell, Shield, Palette, X, Globe, Eye } from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [theme, setTheme] = useState('dark');
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState('friends');
  const [language, setLanguage] = useState('en');
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium'
  });

  const themes = [
    { id: 'dark', name: 'Dark', icon: <Moon className="w-5 h-5" /> },
    { id: 'light', name: 'Light', icon: <Sun className="w-5 h-5" /> },
    { id: 'system', name: 'System', icon: <Palette className="w-5 h-5" /> }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  return (
    <div className="absolute top-16 right-4 w-96 max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-black/90 rounded-xl border border-white/10 shadow-2xl">
      <div className="sticky top-0 bg-black/90 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">Settings</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-400">Theme</h4>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
                  theme === t.id ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/10'
                } border hover:bg-white/10 transition-all duration-300`}
              >
                {t.icon}
                <span className="text-sm">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sound */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-400">Sound</h4>
            <Volume2 className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <h4 className="text-sm font-medium">Notifications</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        {/* Privacy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-400" />
            <h4 className="text-sm font-medium">Privacy</h4>
          </div>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <h4 className="text-sm font-medium">Language</h4>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Accessibility */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-gray-400" />
            <h4 className="text-sm font-medium">Accessibility</h4>
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="text-sm">High Contrast</span>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={(e) => setAccessibility({ ...accessibility, highContrast: e.target.checked })}
                className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Reduced Motion</span>
              <input
                type="checkbox"
                checked={accessibility.reducedMotion}
                onChange={(e) => setAccessibility({ ...accessibility, reducedMotion: e.target.checked })}
                className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
              />
            </label>
            <div>
              <span className="text-sm block mb-1">Font Size</span>
              <select
                value={accessibility.fontSize}
                onChange={(e) => setAccessibility({ ...accessibility, fontSize: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-black/90 p-4 border-t border-white/10">
        <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
