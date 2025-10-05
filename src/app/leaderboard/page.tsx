export default function Leaderboard() {
  const scores = [
    { rank: 1, name: 'SnakeMaster', score: 450, date: '2025-10-01' },
    { rank: 2, name: 'ProGamer', score: 380, date: '2025-10-02' },
    { rank: 3, name: 'SpeedRunner', score: 320, date: '2025-10-03' },
    { rank: 4, name: 'Challenger', score: 285, date: '2025-10-03' },
    { rank: 5, name: 'Beginner', score: 150, date: '2025-10-04' },
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🏆 Leaderboard</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-3 text-gray-700">Rank</th>
                <th className="text-left p-3 text-gray-700">Player</th>
                <th className="text-left p-3 text-gray-700">Score</th>
                <th className="text-left p-3 text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <span className={`font-bold ${
                      entry.rank === 1 ? 'text-yellow-500' :
                      entry.rank === 2 ? 'text-gray-400' :
                      entry.rank === 3 ? 'text-orange-600' :
                      'text-gray-600'
                    }`}>
                      #{entry.rank}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-gray-800">{entry.name}</td>
                  <td className="p-3 text-green-600 font-bold">{entry.score}</td>
                  <td className="p-3 text-gray-600">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}