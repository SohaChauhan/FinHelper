import Navbar from "../components/Navbar";

import { FaChartBar, FaCogs, FaFileExport, FaLightbulb } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl  font-bold text-blue-950 text-center drop-shadow mb-4">
          Financial Decision Helper
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-blue-900 text-center max-w-2xl mb-8">
          Make smarter business decisions with interactive CVP, break-even, and What-If analysis for all your products.
        </p>
        <a href="/analysis">
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition-all duration-150">
            Get Started
          </button>
        </a>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-10 px-4">
        <div className="flex flex-col items-center text-center bg-white/80 rounded-2xl shadow-lg p-8">
          <FaChartBar className="text-blue-700 text-5xl mb-3" />
          <h2 className="text-2xl font-bold mb-2">Multi-Product CVP Analysis</h2>
          <p className="text-lg text-gray-700">Input details for multiple products and instantly see contribution margin, break-even, and profit for each one.</p>
        </div>
        <div className="flex flex-col items-center text-center bg-white/80 rounded-2xl shadow-lg p-8">
          <FaLightbulb className="text-yellow-500 text-5xl mb-3" />
          <h2 className="text-2xl font-bold mb-2">What-If & Target Profit</h2>
          <p className="text-lg text-gray-700">Set a target profit and discover the sales needed to reach your goals, with margin of safety calculations.</p>
        </div>
        <div className="flex flex-col items-center text-center bg-white/80 rounded-2xl shadow-lg p-8">
          <FaCogs className="text-green-700 text-5xl mb-3" />
          <h2 className="text-2xl font-bold mb-2">Interactive Graphs</h2>
          <p className="text-lg text-gray-700">Visualize break-even, revenue, and cost with beautiful, interactive graphs for each product.</p>
        </div>
        <div className="flex flex-col items-center text-center bg-white/80 rounded-2xl shadow-lg p-8">
          <FaFileExport className="text-red-600 text-5xl mb-3" />
          <h2 className="text-2xl font-bold mb-2">Export & Share</h2>
          <p className="text-lg text-gray-700">Download your analysis as PDF or CSV for easy sharing and reporting.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center text-blue-900 bg-blue-50/60 mt-10">
        <p className="text-lg">&copy; {new Date().getFullYear()} Financial Decision Helper</p>
        <a href="/analysis" className="text-blue-700 underline mt-2 hover:text-blue-900">Go to Analysis &rarr;</a>
      </footer>
    </div>
  );
}
