
import React, { useState, useRef, useEffect } from 'react';

export default function AssignmentComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed.length === 0) return;
    setMessages((prev) => [...prev, trimmed]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center' }}>Simple Chat</h1>
      
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        minHeight: '200px',
        marginBottom: '1rem',
        backgroundColor: '#f9f9f9',
        overflowY: 'auto',
        maxHeight: '400px'
      }}>
        {messages.length === 0 ? (
          <p style={{ color: '#777' }}>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{
              padding: '0.5rem',
              backgroundColor: '#e0f7fa',
              marginBottom: '0.5rem',
              borderRadius: '5px'
            }}>
              {msg}
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
