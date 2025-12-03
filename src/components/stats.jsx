export default function Stats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-center shadow-lg transform hover:scale-105 transition-all">
        <div className="text-3xl font-bold text-white">{stats.total}</div>
        <div className="text-sm text-blue-100 font-medium mt-1">Total Tasks</div>
      </div>
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-5 text-center shadow-lg transform hover:scale-105 transition-all">
        <div className="text-3xl font-bold text-white">{stats.active}</div>
        <div className="text-sm text-yellow-100 font-medium mt-1">Active</div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-center shadow-lg transform hover:scale-105 transition-all">
        <div className="text-3xl font-bold text-white">{stats.completed}</div>
        <div className="text-sm text-green-100 font-medium mt-1">Completed</div>
      </div>
    </div>
  );
}
