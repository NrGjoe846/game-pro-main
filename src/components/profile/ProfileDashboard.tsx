import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Trophy, Star, Code, Book, Timer, Target, Award, GitBranch, Zap, 
  Activity, Wallet, ChevronRight, Users, Sword, Shield, Crown,
  Gamepad, Gift, Sparkles, Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../BackButton';
import { useSpring, animated } from 'react-spring';

const ProfileDashboard = () => {
  const { user } = useAuth();
  const [showAvatarCustomization, setShowAvatarCustomization] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);

  // Avatar customization options
  const avatarOptions = {
    hairstyles: ['long', 'short', 'curly', 'straight'],
    outfits: ['casual', 'formal', 'warrior', 'mage'],
    accessories: ['glasses', 'hat', 'crown', 'mask'],
    expressions: ['smile', 'determined', 'confident', 'focused']
  };

  // Active quests and missions
  const activeQuests = [
    { 
      id: 1, 
      title: 'Python Master Quest', 
      description: 'Complete 5 Python challenges',
      progress: 3,
      total: 5,
      reward: { xp: 500, coins: 100, item: 'Pythonic Staff' },
      type: 'daily'
    },
    { 
      id: 2, 
      title: 'Algorithm Champion', 
      description: 'Solve 3 hard algorithm problems',
      progress: 1,
      total: 3,
      reward: { xp: 1000, coins: 200, item: 'Algorithm Crown' },
      type: 'weekly'
    },
    { 
      id: 3, 
      title: 'Learning Streak', 
      description: 'Maintain a 7-day learning streak',
      progress: 5,
      total: 7,
      reward: { xp: 300, coins: 50, item: 'Streak Flame' },
      type: 'challenge'
    }
  ];

  // Game stats
  const gameStats = {
    rank: 'Gold',
    title: 'Code Warrior',
    powerLevel: 1250,
    questsCompleted: 47,
    bossesDefeated: 12,
    specialItems: 8
  };

  // Inventory items
  const inventory = [
    { id: 1, name: 'Pythonic Staff', type: 'weapon', rarity: 'rare', boost: '+15% Python XP' },
    { id: 2, name: 'Algorithm Crown', type: 'accessory', rarity: 'epic', boost: '+20% Problem Solving' },
    { id: 3, name: 'Debug Glasses', type: 'tool', rarity: 'uncommon', boost: '+10% Bug Detection' }
  ];

  const stats = [
    { icon: <Trophy className="w-5 h-5" />, label: 'Total XP', value: '12,450' },
    { icon: <Star className="w-5 h-5" />, label: 'Achievements', value: '24/50' },
    { icon: <Code className="w-5 h-5" />, label: 'Problems Solved', value: '156' },
    { icon: <Book className="w-5 h-5" />, label: 'Courses Completed', value: '8' },
    { icon: <Timer className="w-5 h-5" />, label: 'Current Streak', value: '12 days' },
    { icon: <Target className="w-5 h-5" />, label: 'Accuracy', value: '94%' },
  ];

  const achievements = [
    { name: 'Python Master', progress: 75, total: 100, level: 3 },
    { name: 'JavaScript Ninja', progress: 60, total: 100, level: 2 },
    { name: 'Algorithm Expert', progress: 45, total: 100, level: 1 },
  ];

  const virtualEconomy = {
    balance: 1250,
    inventory: [
      { id: 1, name: 'Premium Course Access', quantity: 2 },
      { id: 2, name: 'Challenge Tokens', quantity: 5 },
      { id: 3, name: 'Special Badges', quantity: 3 },
    ],
    recentTransactions: [
      { id: 1, type: 'earned', amount: 100, description: 'Completed Python Challenge' },
      { id: 2, type: 'spent', amount: 50, description: 'Purchased Course Access' },
      { id: 3, type: 'earned', amount: 75, description: 'Daily Streak Bonus' },
    ]
  };

  const leaderboard = [
    { rank: 1, name: 'Alex M.', points: 15420, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { rank: 2, name: 'Sarah K.', points: 14250, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { rank: 3, name: 'John D.', points: 13890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  ];

  // Animation for power level
  const { powerLevel } = useSpring({
    from: { powerLevel: 0 },
    to: { powerLevel: gameStats.powerLevel },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 }
  });

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: virtualEconomy.balance },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 }
  });

  // Quest card component
  const QuestCard = ({ quest }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{quest.title}</h3>
          <p className="text-sm text-gray-400">{quest.description}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          quest.type === 'daily' ? 'bg-blue-500/20 text-blue-400' :
          quest.type === 'weekly' ? 'bg-purple-500/20 text-purple-400' :
          'bg-orange-500/20 text-orange-400'
        }`}>
          {quest.type}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{quest.progress}/{quest.total}</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Gift className="w-4 h-4 text-yellow-400" />
        <span>Rewards:</span>
        <span className="text-blue-400">{quest.reward.xp} XP</span>
        <span className="text-yellow-400">{quest.reward.coins} coins</span>
        <span className="text-purple-400">{quest.reward.item}</span>
      </div>
    </motion.div>
  );

  // Inventory item component
  const InventoryItem = ({ item }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-lg border ${
        item.rarity === 'rare' ? 'border-blue-500/50 bg-blue-500/10' :
        item.rarity === 'epic' ? 'border-purple-500/50 bg-purple-500/10' :
        'border-green-500/50 bg-green-500/10'
      }`}
    >
      <div className="flex items-center gap-3">
        {item.type === 'weapon' ? <Sword className="w-5 h-5" /> :
         item.type === 'accessory' ? <Crown className="w-5 h-5" /> :
         <Shield className="w-5 h-5" />}
        <div>
          <h4 className="font-bold">{item.name}</h4>
          <p className="text-sm text-gray-400">{item.boost}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <BackButton label="Back to Dashboard" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar and Character Stats */}
          <div className="space-y-8">
            {/* Character Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20"
            >
              {/* Rank Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-sm font-bold">
                  {gameStats.rank}
                </div>
              </div>

              {/* Avatar with Customization */}
              <div className="relative flex flex-col items-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Power Level Ring */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="5"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: gameStats.powerLevel / 2000 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Avatar Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-32 h-32"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                      alt="Character Avatar"
                      className="w-full h-full rounded-full border-4 border-white/20"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAvatarCustomization(true)}
                      className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Character Info */}
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-gray-400">{gameStats.title}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <animated.span className="font-bold">
                      {powerLevel.to(n => `Power Level: ${n.toFixed(0)}`)}
                    </animated.span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                      {gameStats.questsCompleted}
                    </div>
                    <div className="text-sm text-gray-400">Quests</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      {gameStats.bossesDefeated}
                    </div>
                    <div className="text-sm text-gray-400">Bosses</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Inventory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Inventory</h2>
                </div>
                <span className="text-sm text-gray-400">
                  {inventory.length} items
                </span>
              </div>

              <div className="space-y-4">
                {inventory.map(item => (
                  <InventoryItem key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Quests and Missions */}
          <div className="space-y-8">
            {/* Active Quests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Map className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Active Quests</h2>
                </div>
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {activeQuests.map(quest => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            </motion.div>

            {/* Game Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Gamepad className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Game Stats</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(gameStats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg"
                  >
                    <div className="text-sm text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xl font-bold">{value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Leaderboard and Activity */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Leaderboard</h2>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center font-bold">
                        #{user.rank}
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white/20"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.points.toLocaleString()} XP</div>
                      </div>
                    </div>
                    {index === 0 && (
                      <Trophy className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Activity</h2>
                </div>
                <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              <div className="h-48 flex items-end justify-between">
                {[40, 65, 32, 78, 45, 60, 35].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Avatar Customization Modal */}
        <AnimatePresence>
          {showAvatarCustomization && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1a1a2e] rounded-2xl p-6 max-w-md w-full m-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Customize Avatar</h2>
                  <button
                    onClick={() => setShowAvatarCustomization(false)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    ×
                  </button>
                </div>

                {Object.entries(avatarOptions).map(([category, options]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-lg font-semibold capitalize mb-3">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {options.map(option => (
                        <button
                          key={option}
                          className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowAvatarCustomization(false)}
                    className="px-4 py-2 bg-white/10 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowAvatarCustomization(false)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileDashboard;
