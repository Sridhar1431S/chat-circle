
// Assuming this file exists and we're adding a receiverId field to the Message type
// If the file structure is different, this would need to be adjusted accordingly

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  statusMessage: string;
  isTyping: boolean;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  userIds: string[];
}

export interface Message {
  id: string;
  userId: string;
  receiverId?: string; // Added field for direct messaging
  text: string;
  timestamp: Date;
  reactions: MessageReaction[];
}

export const availableReactions = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

export const currentUserId = 'user-1';

export const statusOptions = [
  { value: 'online', label: 'Online', emoji: '🟢' },
  { value: 'busy', label: 'Busy', emoji: '🔴' },
  { value: 'away', label: 'Away', emoji: '🟠' },
  { value: 'offline', label: 'Offline', emoji: '⚫' }
];

export const initialUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John',
    status: 'online',
    statusMessage: 'Available',
    isTyping: false
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jane',
    status: 'online',
    statusMessage: 'Working on project',
    isTyping: false
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob',
    status: 'busy',
    statusMessage: 'In a meeting',
    isTyping: false
  },
  {
    id: 'user-4',
    name: 'Alice Williams',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice',
    status: 'away',
    statusMessage: 'Be right back',
    isTyping: false
  },
  {
    id: 'user-5',
    name: 'Charlie Brown',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie',
    status: 'online',
    statusMessage: 'Just chilling',
    isTyping: false
  }
];

export const initialMessages: Message[] = [
  {
    id: 'msg-1',
    userId: 'user-2',
    receiverId: 'global',
    text: 'Hey everyone, how are you doing today?',
    timestamp: new Date('2023-05-01T09:00:00'),
    reactions: [
      { emoji: '👍', count: 2, userIds: ['user-1', 'user-3'] },
      { emoji: '❤️', count: 1, userIds: ['user-4'] }
    ]
  },
  {
    id: 'msg-2',
    userId: 'user-1',
    receiverId: 'global',
    text: "I'm doing great! Just finished a big project.",
    timestamp: new Date('2023-05-01T09:05:00'),
    reactions: []
  },
  {
    id: 'msg-3',
    userId: 'user-3',
    receiverId: 'global',
    text: 'Congrats on finishing your project!',
    timestamp: new Date('2023-05-01T09:10:00'),
    reactions: [
      { emoji: '🎉', count: 3, userIds: ['user-1', 'user-2', 'user-4'] }
    ]
  },
  // Direct messages between user-1 and user-2
  {
    id: 'dm-1',
    userId: 'user-2',
    receiverId: 'user-1',
    text: 'Hey, can you help me with something?',
    timestamp: new Date('2023-05-01T10:00:00'),
    reactions: []
  },
  {
    id: 'dm-2',
    userId: 'user-1',
    receiverId: 'user-2',
    text: 'Sure, what do you need?',
    timestamp: new Date('2023-05-01T10:05:00'),
    reactions: []
  },
  // Direct messages between user-1 and user-3
  {
    id: 'dm-3',
    userId: 'user-3',
    receiverId: 'user-1',
    text: 'Are we still meeting tomorrow?',
    timestamp: new Date('2023-05-01T11:00:00'),
    reactions: []
  },
  {
    id: 'dm-4',
    userId: 'user-1',
    receiverId: 'user-3',
    text: 'Yes, 2 PM works for me.',
    timestamp: new Date('2023-05-01T11:05:00'),
    reactions: []
  }
];
