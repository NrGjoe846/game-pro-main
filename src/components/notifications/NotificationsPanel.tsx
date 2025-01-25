import React from 'react';
import { Bell, Star, Trophy, Book, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'achievement' | 'course' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'New Achievement Unlocked!',
    message: 'You\'ve completed your first Python course.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'course',
    title: 'Course Reminder',
    message: 'Continue your JavaScript learning journey.',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'system',
    title: 'Daily Streak!',
    message: 'You\'ve maintained a 7-day learning streak!',
    time: '1 day ago',
    read: true
  }
];

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'course':
        return <Book className="w-5 h-5 text-blue-400" />;
      default:
        return <Bell className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="absolute top-16 right-4 w-96 max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-black/90 rounded-xl border border-white/10 shadow-2xl">
      <div className="sticky top-0 bg-black/90 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/20'
            } hover:bg-white/20 transition-all duration-300 cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{notification.title}</h4>
                <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-black/90 p-4 border-t border-white/10">
        <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300">
          Mark All as Read
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
