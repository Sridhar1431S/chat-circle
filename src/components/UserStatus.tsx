
import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { statusOptions } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const UserStatus: React.FC = () => {
  const { currentUser, setUserStatus } = useChatContext();
  const [status, setStatus] = useState(currentUser?.status || 'online');
  const [statusMessage, setStatusMessage] = useState(currentUser?.statusMessage || '');

  const handleStatusUpdate = () => {
    setUserStatus(status as 'online' | 'busy' | 'away' | 'offline', statusMessage);
  };

  const getStatusEmoji = () => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.emoji : '🟢';
  };

  if (!currentUser) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
          <span>{getStatusEmoji()}</span>
          <span className="truncate max-w-[120px] text-sm">{currentUser.statusMessage}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Update your status</h3>
          
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup 
              value={status} 
              onValueChange={(value) => setStatus(value as 'online' | 'busy' | 'away' | 'offline')}
              className="flex flex-wrap gap-2"
            >
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex items-center gap-1 cursor-pointer">
                    <span>{option.emoji}</span>
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Status message</Label>
            <Input
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="What's happening?"
              maxLength={30}
            />
          </div>
          
          <Button onClick={handleStatusUpdate} className="w-full">
            Update Status
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
