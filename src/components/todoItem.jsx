import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    if (editText.trim()) {
      await onUpdate(todo.id, { text: editText });
      setIsEditing(false);
    }
  };

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all duration-300 hover:shadow-lg ${
      todo.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
    } ${isDeleting ? 'opacity-50 scale-95' : ''}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-md'
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          {todo.completed && <Check className="w-5 h-5 text-white" />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border-2 border-indigo-300 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              autoFocus
            />
            <button
              onClick={handleUpdate}
              className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-all"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
              }}
              className="px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 text-base ${
                todo.completed 
                  ? 'line-through text-gray-500 font-medium' 
                  : 'text-gray-800 font-medium'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}