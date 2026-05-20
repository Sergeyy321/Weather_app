import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (city: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type city name..."
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          flex: 1
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
    Find
      </button>
    </form>
  );
};