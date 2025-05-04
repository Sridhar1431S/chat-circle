
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChatContext } from '../context/ChatContext';
import { Message as MessageInterface } from '../data/mockData';

interface MessageProps {
  message: MessageInterface;
  sender: any; // Using 'any' to match the existing implementation
}

export const Message: React.FC<MessageProps> = ({ message, sender }) => {
  const { currentUser, addReaction } = useChatContext();
  const isCurrentUser = message.userId === currentUser?.id;

  return (
    <div className={cn(
      "flex gap-2 mb-3",
      isCurrentUser ? "flex-row-reverse" : ""
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={sender.avatar} alt={sender.name} />
        <AvatarFallback>{sender.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className={cn(
        "max-w-[75%]",
        isCurrentUser ? "items-end" : ""
      )}>
        <div className={cn(
          "px-4 py-2.5 rounded-2xl",
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-secondary rounded-tl-none"
        )}>
          <p>{message.text}</p>
        </div>
        
        <div className={cn(
          "flex gap-1 mt-1",
          isCurrentUser ? "justify-end" : ""
        )}>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
