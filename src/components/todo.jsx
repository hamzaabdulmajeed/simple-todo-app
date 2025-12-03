import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (text.trim()) {
      setIsAdding(true);
      await onAdd(text);
      setText('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-100">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 placeholder-gray-400"
          disabled={isAdding}
        />
        <button
          onClick={handleAdd}
          disabled={isAdding || !text.trim()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>
    </div>
  );
}
