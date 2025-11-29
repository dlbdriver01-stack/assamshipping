"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package } from "lucide-react";

export default function TrackingSearchBar() {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) {
      router.push(`/track/${id.trim()}`);
    }
  };

  return (
    <form className="relative group" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
          <Package className="w-5 h-5" />
        </div>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter tracking ID (e.g. IN2458922)"
          className="w-full pl-12 pr-28 sm:pr-32 py-3 sm:py-4 text-base sm:text-lg
             border-2 border-slate-200 rounded-xl focus:outline-none
             focus:border-primary focus:ring-4 focus:ring-primary/10
             transition-all bg-white shadow-sm hover:shadow-md
             text-slate-900 placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="absolute right-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Track</span>
        </button>
      </div>
    </form>
  );
}
