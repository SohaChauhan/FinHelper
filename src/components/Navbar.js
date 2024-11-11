export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-semibold">Financial Decision Helper</h1>
      <div>
        <a href="/" className="mr-4">
          Home
        </a>
        <a href="/analysis">CVP Analysis</a>
      </div>
    </nav>
  );
}
