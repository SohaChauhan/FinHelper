"use client";
import { FaChartPie } from "react-icons/fa";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="backdrop-blur bg-white/60 border-b border-blue-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20 font-sans">
      <div className="flex items-center gap-2">
        <FaChartPie className="text-blue-800 text-3xl mr-2" />
        <span className="text-2xl font-heading font-extrabold text-blue-900 tracking-tight">FinHelper</span>
      </div>
      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-lg font-medium">
        <a href="/" className="hover:text-blue-700 transition-colors">Home</a>
        <a href="/analysis" className="hover:text-blue-700 transition-colors">CVP Analysis</a>
        <a href="/about" className="hover:text-blue-700 transition-colors">About</a>
      </div>
      {/* Hamburger Icon */}
      <button
        className="md:hidden text-2xl text-blue-900 focus:outline-none ml-2"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <FaBars />
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-6 z-30 md:hidden animate-fade-in">
          <a href="/" className="text-lg font-medium hover:text-blue-700 transition-colors" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/analysis" className="text-lg font-medium hover:text-blue-700 transition-colors" onClick={() => setMenuOpen(false)}>CVP Analysis</a>
          <a href="/about" className="text-lg font-medium hover:text-blue-700 transition-colors" onClick={() => setMenuOpen(false)}>About</a>
        </div>
      )}
    </nav>
  );
}


