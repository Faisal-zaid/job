import React from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full group">
      {/* Search Icon - Changes to bright blue on focus */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
        <Search size={20} strokeWidth={2.5} />
      </div>

      {/* Input Field - Slate Dark Theme */}
      <input
        type="text"
        placeholder="Search for titles, skills, or companies..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl py-4 pl-14 pr-6 text-white font-medium placeholder:text-slate-500 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 focus:bg-slate-900/80 transition-all duration-300 shadow-2xl"
      />

      {/* Keyboard Hint - Dark Mode adjusted */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700">
        <span className="text-[9px] font-black text-slate-500 tracking-tighter uppercase italic">
          ⌘ K
        </span>
      </div>
    </div>
  );
}

export default SearchBar;