"use client";

import { useState } from "react";

// ==========================================
// 1. THE SVG PHASOR DIAGRAM COMPONENT
// ==========================================
const PhasorDiagram = ({ R, XL, XC, Z, netX }: { R: number, XL: number, XC: number, Z: number, netX: number }) => {
  const size = 300;
  const center = size / 2;
  
  // Dynamic scaling so vectors always fit in the box
  const maxVal = Math.max(R, XL, XC, Math.abs(netX), 10);
  const scale = (size / 2 - 40) / maxVal;

  const endR = center + R * scale;
  const endXL = center - XL * scale;
  const endXC = center + XC * scale;
  const endZ_Y = center - netX * scale;

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-slate-900 rounded-full border-4 border-slate-800 shadow-inner flex items-center justify-center">
      <svg width={size} height={size} className="absolute inset-0 w-full h-full">
        {/* Grid Lines */}
        <line x1={center} y1="20" x2={center} y2={size - 20} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1={center} x2={size - 20} y2={center} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Capacitive Reactance (XC) */}
        {XC > 0 && (
          <g>
            <line x1={center} y1={center} x2={center} y2={endXC} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-amber)" />
            <text x={center + 10} y={endXC - 10} fill="#f59e0b" fontSize="12" fontWeight="bold">XC</text>
          </g>
        )}

        {/* Inductive Reactance (XL) */}
        {XL > 0 && (
          <g>
            <line x1={center} y1={center} x2={center} y2={endXL} stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrow-indigo)" />
            <text x={center + 10} y={endXL + 15} fill="#6366f1" fontSize="12" fontWeight="bold">XL</text>
          </g>
        )}

        {/* Resistance (R) */}
        <g>
          <line x1={center} y1={center} x2={endR} y2={center} stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-emerald)" />
          <text x={endR - 15} y={center + 20} fill="#10b981" fontSize="12" fontWeight="bold">R</text>
        </g>

        {/* Total Impedance (Z) */}
        {(Math.abs(netX) > 0.1 || R > 0) && (
          <g>
            <line x1={center} y1={center} x2={endR} y2={endZ_Y} stroke="#ffffff" strokeWidth="4" strokeDasharray="5 5" markerEnd="url(#arrow-white)" />
            <text x={endR + 10} y={endZ_Y + (netX > 0 ? -10 : 20)} fill="#ffffff" fontSize="14" fontWeight="bold">Z</text>
            <line x1={endR} y1={center} x2={endR} y2={endZ_Y} stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        )}

        {/* Arrowheads */}
        <defs>
          <marker id="arrow-indigo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#6366f1" /></marker>
          <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" /></marker>
          <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#10b981" /></marker>
          <marker id="arrow-white" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#ffffff" /></marker>
        </defs>
      </svg>
      <div className="absolute w-3 h-3 bg-white rounded-full z-10 shadow-md"></div>
    </div>
  );
};


// ==========================================
// 2. THE MAIN PAGE COMPONENT (DEFAULT EXPORT)
// ==========================================
export default function CalculatorEngine() {
  // State variables for inputs
  const [voltage, setVoltage] = useState(120);
  const [frequency, setFrequency] = useState(60);
  const [resistance, setResistance] = useState(50);
  const [inductance, setInductance] = useState(150);
  const [capacitance, setCapacitance] = useState(100);

  // Complex Math Calculations
  const w = 2 * Math.PI * frequency;
  const L_Henries = inductance / 1000; 
  const C_Farads = capacitance / 1000000;

  const XL = w * L_Henries;
  const XC = 1 / (w * C_Farads);
  const netReactance = XL - XC;
  
  const impedance = Math.sqrt(Math.pow(resistance, 2) + Math.pow(netReactance, 2));
  const phaseAngleRad = Math.atan(netReactance / resistance);
  const phaseAngleDeg = phaseAngleRad * (180 / Math.PI);
  
  const current = voltage / impedance;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      
      {/* LEFT COLUMN: Input Controls */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit sticky top-24">
        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Circuit Parameters</h2>
        
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
              <span>Voltage (RMS)</span>
              <span className="text-blue-600">{voltage} V</span>
            </label>
            <input type="range" min="10" max="240" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
              <span>Frequency</span>
              <span className="text-blue-600">{frequency} Hz</span>
            </label>
            <input type="range" min="10" max="120" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="mb-6">
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                <span>Resistance (R)</span>
                <span className="text-emerald-600">{resistance} Ω</span>
              </label>
              <input type="range" min="1" max="500" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="mb-6">
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                <span>Inductance (L)</span>
                <span className="text-indigo-600">{inductance} mH</span>
              </label>
              <input type="range" min="1" max="500" value={inductance} onChange={(e) => setInductance(Number(e.target.value))} className="w-full accent-indigo-500" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                <span>Capacitance (C)</span>
                <span className="text-amber-600">{capacitance} µF</span>
              </label>
              <input type="range" min="1" max="1000" value={capacitance} onChange={(e) => setCapacitance(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Real-Time Results Dashboard */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Series RLC Analysis</h1>
          <p className="text-slate-500 mt-1">Real-time impedance and reactance calculation engine.</p>
        </div>

        {/* Primary Output Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-xl p-6 shadow-md border border-slate-800">
            <h3 className="text-slate-400 text-sm font-medium mb-1">Total Impedance (Z)</h3>
            <p className="text-3xl font-bold text-white">{impedance.toFixed(2)} <span className="text-lg text-slate-500">Ω</span></p>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-6 shadow-md border border-slate-800">
            <h3 className="text-slate-400 text-sm font-medium mb-1">RMS Current (I)</h3>
            <p className="text-3xl font-bold text-blue-400">{current.toFixed(3)} <span className="text-lg text-slate-500">A</span></p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 shadow-md border border-slate-800">
            <h3 className="text-slate-400 text-sm font-medium mb-1">Phase Angle (θ)</h3>
            <p className="text-3xl font-bold text-white">
              {Math.abs(phaseAngleDeg).toFixed(2)}° 
              <span className="block mt-1 text-sm font-normal text-slate-400">
                {phaseAngleDeg > 0 ? "Current Lags Voltage" : phaseAngleDeg < 0 ? "Current Leads Voltage" : "In Phase"}
              </span>
            </p>
          </div>
        </div>

        {/* Visual Analytics & Reactance Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
          
          {/* LEFT PANEL: The Live Diagram */}
          <div className="bg-slate-950 rounded-xl p-6 shadow-sm border border-slate-800 flex flex-col items-center justify-center min-h-[350px]">
            <h3 className="text-slate-300 font-semibold mb-6 w-full text-center">Live Phasor Diagram</h3>
            <PhasorDiagram R={resistance} XL={XL} XC={XC} Z={impedance} netX={netReactance} />
          </div>

          {/* RIGHT PANEL: The Reactance Bars & Insight */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Reactance Balance</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-500 mb-1">Inductive (X_L)</span>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold text-indigo-700">{XL.toFixed(2)} Ω</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${Math.min((XL / Math.max(XL, XC, 1)) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-500 mb-1">Capacitive (X_C)</span>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold text-amber-600">{XC.toFixed(2)} Ω</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${Math.min((XC / Math.max(XL, XC, 1)) * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Insight Box */}
            <div className={`mt-6 p-4 border rounded-lg ${netReactance > 0 ? 'bg-indigo-50 border-indigo-100' : netReactance < 0 ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
              <h4 className={`text-sm font-bold mb-1 ${netReactance > 0 ? 'text-indigo-800' : netReactance < 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
                State: {netReactance > 0 ? "Inductive" : netReactance < 0 ? "Capacitive" : "Resonant"}
              </h4>
              <p className={`text-sm ${netReactance > 0 ? 'text-indigo-600' : netReactance < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {netReactance > 0 
                  ? "Inductive load dominates. Current is lagging behind voltage." 
                  : netReactance < 0 
                  ? "Capacitive load dominates. Current is leading ahead of voltage." 
                  : "Perfect resonance. Reactive components cancel out."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}