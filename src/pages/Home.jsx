import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 text-gray-800">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-emerald-700">Welcome to EV Charging App ⚡</h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl">
        Find nearby EV charging stations, book your slot, and keep your ride powered up effortlessly.
      </p>

      <div className="flex gap-6">
        <Link to="/stations">
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-700 transition-all text-lg">
            🔌 Find Stations
          </button>
        </Link>

        <button
          onClick={() => setShowAbout(!showAbout)}
          className="px-6 py-3 bg-white border border-emerald-600 text-emerald-700 rounded-xl shadow-lg hover:bg-emerald-100 transition-all text-lg"
        >
          📖 About
        </button>
      </div>

      {/* Conditionally render the About section */}
      {showAbout && (
        <div className="mt-16 max-w-3xl text-center text-gray-600 px-4">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">About This App</h2>
          <p>
            This application helps electric vehicle owners easily locate and book charging stations nearby.
            Powered by real-time Firebase updates and interactive Google Maps, ensuring you never run out of charge.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
