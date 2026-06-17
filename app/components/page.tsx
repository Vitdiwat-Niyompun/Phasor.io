"use client";

import { useState, useMemo } from "react";


// 1. Upgraded Database: Now includes plain-English beginner descriptions
const COMPONENT_DB = [
  { id: "R1", category: "Resistor", name: "Standard Resistor", value: "1 kΩ", beginnerDesc: "A basic speed bump. Slows down the flow of electricity to protect other parts.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "R2", category: "Resistor", name: "High-Value Resistor", value: "10 kΩ", beginnerDesc: "A massive speed bump. Heavily restricts the current passing through.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "R3", category: "Resistor", name: "Power Resistor", value: "50 Ω", beginnerDesc: "A tough speed bump designed to handle and burn off a lot of electrical heat.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  
  { id: "C1", category: "Capacitor", name: "Small Ceramic", value: "100 nF", beginnerDesc: "A tiny water balloon. Fills up and releases energy almost instantly to filter noise.", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "C2", category: "Capacitor", name: "Large Electrolytic", value: "100 µF", beginnerDesc: "A large water tank. Stores a lot of energy to keep voltage steady during drops.", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "C3", category: "Capacitor", name: "Tantalum Cap", value: "10 µF", beginnerDesc: "A highly precise, medium-sized tank. Very stable and reliable.", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  
  { id: "L1", category: "Inductor", name: "Small Choke", value: "100 µH", beginnerDesc: "A lightweight water wheel. Keeps current flowing smoothly and blocks high-frequency jumps.", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
  { id: "L2", category: "Inductor", name: "Power Inductor", value: "1 mH", beginnerDesc: "A heavy flywheel. Strongly resists any sudden changes in the flow of electricity.", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
];

export default function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Resistor", "Capacitor", "Inductor"];

  // 2. Smart Search Engine: Now searches descriptions as well as names!
  const filteredComponents = useMemo(() => {
    return COMPONENT_DB.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.beginnerDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === "All" || item.category === activeFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Component Library</h1>
        <p className="text-lg text-slate-500 max-w-3xl">
          Browse our database of electrical components. If you are new to circuits, check out the beginner cheat sheet below!
        </p>
      </div>

      {/* EDUCATIONAL PRIMER (The "Cheat Sheet") */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
            <span className="text-xl">〰️</span> Resistors
          </h3>
          <p className="text-sm text-emerald-700 leading-relaxed">
            <strong>The Brakes.</strong> Think of a resistor like pinching a water hose. It restricts the flow of electricity (current) so other components don't get overwhelmed and burn out.
          </p>
        </div>
        
        <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
            <span className="text-xl">🔋</span> Capacitors
          </h3>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>The Water Tank.</strong> It stores electrical energy and can release it very quickly. It is used to smooth out bumpy power supplies and provide quick bursts of energy.
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-indigo-800 flex items-center gap-2 mb-2">
            <span className="text-xl">⚙️</span> Inductors
          </h3>
          <p className="text-sm text-indigo-700 leading-relaxed">
            <strong>The Heavy Flywheel.</strong> It stores energy in a magnetic field. It hates sudden changes, so it acts like a shock absorber to keep electrical current flowing steadily.
          </p>
        </div>
      </div>

      {/* CONTROLS SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="w-full md:w-1/2 relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="Search parts or beginner concepts (e.g., 'speed bump')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>

        <div className="w-full md:w-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === cat ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.length > 0 ? (
          filteredComponents.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.bg} ${item.color} ${item.border} border`}>
                  {item.category}
                </span>
                <span className="text-slate-400 text-xs font-mono">{item.id}</span>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                <div className="text-3xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
                  {item.value}
                </div>
                
                {/* The Friendly Description Box */}
                <div className="mt-auto bg-slate-50 border border-slate-100 rounded-lg p-3">
                  <p className="text-sm text-slate-600 leading-snug">
                    <span className="font-semibold text-slate-700">What it does: </span>
                    {item.beginnerDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-auto">
                
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold text-slate-900">No components found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search query or filter category.</p>
          </div>
        )}
      </div>

    </div>
  );
}