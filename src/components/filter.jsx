export default function TodoFilter({ filter, onFilterChange, stats }) {
  const filters = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'completed', label: 'Completed', count: stats.completed }
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-5 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            filter === f.value
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md'
          }`}
        >
          {f.label}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
            filter === f.value
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}