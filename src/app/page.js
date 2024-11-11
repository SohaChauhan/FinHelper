import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold">
          Welcome to Financial Decision Helper
        </h2>
        <p className="mt-4 text-lg">
          This tool helps you make financial decisions through CVP, Break-Even,
          and What-If analysis.
        </p>
        <a
          href="/analysis"
          className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded"
        >
          Get Started
        </a>
      </main>
    </div>
  );
}
