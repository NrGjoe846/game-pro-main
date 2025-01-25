import React, { useState } from 'react';
import { Trophy, Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';

interface Leader {
  id: string;
  name: string;
  points: number;
  avatar: string;
  position: number;
  hs: number;
}

const LeaderboardCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('DM');
  const [showFilters, setShowFilters] = useState(false);

  const leaders: Leader[] = [
    {
      id: '1',
      name: 'DarOne',
      points: 7751,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarOne',
      position: 1,
      hs: 156
    },
    {
      id: '2',
      name: 'DarOne',
      points: 9274,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarTwo',
      position: 2,
      hs: 156
    },
    {
      id: '3',
      name: 'Kyle',
      points: 1453,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle',
      position: 3,
      hs: 156
    },
    {
      id: '4',
      name: 'Arlene',
      points: 9259,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene',
      position: 4,
      hs: 156
    },
    {
      id: '5',
      name: 'Dianne',
      points: 2798,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne',
      position: 5,
      hs: 156
    },
    {
      id: '6',
      name: 'Arlene',
      points: 4259,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene2',
      position: 6,
      hs: 156
    },
    {
      id: '7',
      name: 'Aubrey',
      points: 4152,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aubrey',
      position: 28,
      hs: 156
    }
  ];

  const modes = [
    { id: 'SURF', name: 'Surf', description: 'Тренировочный режим' },
    { id: 'DM', name: 'DM', description: 'Тренировочный режим' },
    { id: 'RETAKE', name: 'Retake Classic', description: 'Тренировочный режим' },
    { id: 'HSDM', name: 'HSDM', description: 'Тренировочный режим' },
    { id: 'ARENA', name: 'Arena', description: 'Тренировочный режим' },
    { id: 'MULTI', name: 'Multi 1v1', description: 'Тренировочный режим' }
  ];

  return (
    <div className="flex gap-6">
      {/* Game Modes */}
      <div className="w-72">
        <div className="bg-[#0F1923] rounded-xl overflow-hidden">
          <div className="p-4">
            <input
              type="text"
              placeholder="PISTO"
              className="w-full bg-[#1A242D] text-sm px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="space-y-px">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  selectedMode === mode.id 
                    ? 'bg-[#1B2733] border-l-4 border-blue-500' 
                    : 'bg-[#0F1923] hover:bg-[#1B2733]'
                }`}
              >
                <div className="text-sm font-medium">{mode.name}</div>
                <div className="text-xs text-gray-400">{mode.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="flex-1">
        <div className="bg-[#0F1923] rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1B2733]">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="font-bold">Статистика - {selectedMode}</h2>
                <p className="text-sm text-gray-400">За все время</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск игрока..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-[#1B2733] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-[#1B2733] rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400">
                  <th className="py-2 px-4">Позиция</th>
                  <th className="py-2 px-4">Игрок</th>
                  <th className="py-2 px-4">Очки</th>
                  <th className="py-2 px-4">HS</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader) => (
                  <tr 
                    key={leader.id}
                    className={`transition-colors hover:bg-[#1B2733] ${
                      leader.position === 28 ? 'bg-blue-500/10' : ''
                    }`}
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{leader.position}</span>
                        {leader.position < 4 && (
                          <Trophy className={`w-4 h-4 ${
                            leader.position === 1 ? 'text-yellow-400' :
                            leader.position === 2 ? 'text-gray-400' :
                            'text-orange-400'
                          }`} />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={leader.avatar}
                          alt={leader.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{leader.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4">{leader.points}</td>
                    <td className="py-2 px-4">{leader.hs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
