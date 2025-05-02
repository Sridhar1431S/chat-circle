
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  statusMessage: string;
  isTyping: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  userIds: string[];
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
  reactions: Reaction[];
}

export const currentUserId = "user-1";

export const initialUsers: User[] = [
  {
    id: "user-1",
    name: "You",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucy",
    status: "online",
    statusMessage: "Available",
    isTyping: false
  },
  {
    id: "user-2",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    status: "online",
    statusMessage: "Working from home",
    isTyping: false
  },
  {
    id: "user-3",
    name: "Sam Wilson",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sam",
    status: "busy",
    statusMessage: "In a meeting",
    isTyping: false
  },
  {
    id: "user-4",
    name: "Taylor Kim",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Taylor",
    status: "away",
    statusMessage: "BRB in 5",
    isTyping: false
  },
  {
    id: "user-5",
    name: "Jordan Lee",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jordan",
    status: "online",
    statusMessage: "Coding...",
    isTyping: false
  }
];

export const initialMessages: Message[] = [
  {
    id: "msg-1",
    userId: "user-2",
    text: "Hey everyone! Who's working on the new project?",
    timestamp: new Date(Date.now() - 360000),
    reactions: [
      { emoji: "👍", count: 2, userIds: ["user-1", "user-5"] },
      { emoji: "🎉", count: 1, userIds: ["user-3"] }
    ]
  },
  {
    id: "msg-2",
    userId: "user-3",
    text: "I'm on it! Been working on the database schema.",
    timestamp: new Date(Date.now() - 300000),
    reactions: []
  },
  {
    id: "msg-3",
    userId: "user-1",
    text: "I'll be handling the front-end components.",
    timestamp: new Date(Date.now() - 240000),
    reactions: [
      { emoji: "🚀", count: 3, userIds: ["user-2", "user-3", "user-5"] }
    ]
  },
  {
    id: "msg-4",
    userId: "user-5",
    text: "Great! I'll focus on the API integration then.",
    timestamp: new Date(Date.now() - 180000),
    reactions: []
  },
  {
    id: "msg-5",
    userId: "user-4",
    text: "Sorry I'm late to the conversation. I can help with testing once you all have something ready.",
    timestamp: new Date(Date.now() - 120000),
    reactions: [
      { emoji: "👌", count: 2, userIds: ["user-1", "user-2"] }
    ]
  }
];

export const availableReactions = [
  "👍", "❤️", "🎉", "🚀", "👏", "😂", "🔥", "✅", "👌", "😍"
];

export const statusOptions = [
  { value: "online", label: "Available", emoji: "🟢" },
  { value: "busy", label: "Busy", emoji: "🔴" },
  { value: "away", label: "Away", emoji: "🟡" },
  { value: "offline", label: "Offline", emoji: "⚪" }
];
