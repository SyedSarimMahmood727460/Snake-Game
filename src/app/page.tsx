import Link from 'next/link';

export default function Home() {
  const highScores = [
    { name: 'Player 1', score: 450 },
    { name: 'Player 2', score: 380 },
    { name: 'Player 3', score: 320 },
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Snake Game
        </h2>
        <p className="text-xl text-gray-600">
          Classic snake game with modern features
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-xl p-8 text-center mb-8">
        <div className="mb-6">
          <div className="text-6xl mb-4">🐍</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Ready to Play?
          </h3>
          <p className="text-gray-600 mb-6">
            Eat food, avoid bombs, and grow your snake!
          </p>
        </div>
        
        <Link
          href="/play"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          Start Game
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          🏆 Top Scores
        </h3>
        <div className="space-y-3">
          {highScores.map((entry, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <span className="font-semibold text-gray-700">
                #{idx + 1} {entry.name}
              </span>
              <span className="text-green-600 font-bold">{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}