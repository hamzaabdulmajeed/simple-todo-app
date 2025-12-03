import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { LogOut, ListTodo } from 'lucide-react';
import AddTodo from './todo';
import TodoFilter from './filter';
import TodoItem from './todoItem';
import Stats from './stats';

export default function Dashboard({ user, onSignOut }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', user.uid)
      // orderBy('createdAt', 'desc') // Temporarily removed - add back after creating index
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.seconds - a.createdAt.seconds;
      });
      setTodos(todosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const addTodo = async (text) => {
    try {
      await addDoc(collection(db, 'todos'), {
        text,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'todos', id), updates);
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Todos
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {user.email}
              </p>
            </div>
            <button
              onClick={onSignOut}
              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>

          <Stats stats={stats} />
          <AddTodo onAdd={addTodo} />
          <TodoFilter filter={filter} onFilterChange={setFilter} stats={stats} />

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="text-gray-500 mt-4 font-medium">Loading your todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4">
                <ListTodo className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                {filter === 'all' ? 'No todos yet. Create your first task!' : `No ${filter} todos.`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}