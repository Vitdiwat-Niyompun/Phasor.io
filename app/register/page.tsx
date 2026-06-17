"use client"

import { useActionState } from "react";
import { register } from "../action";

type FormState = {
  success: boolean;
  message: string | null;
};

const initialState: FormState = {
  success: false,
  message: null,
};

export default function Home() {
  const [state, formAction] = useActionState(register, initialState);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
      
      <form action={formAction} className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center border-b pb-4">Register Account</h1>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullname" className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              className="rounded-md px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Name Surname"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="rounded-md px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="tel" className="text-sm font-semibold text-slate-700">Telephone</label>
            <input
              id="tel"
              name="tel"
              type="tel"
              className="rounded-md px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Tel"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="file" className="text-sm font-semibold text-slate-700">Profile File (Max 1MB)</label>
            <input
              id="file"
              name="attachment"
              type="file"
              className="rounded-md px-4 py-2 border border-slate-300 text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-md px-4 py-2.5 text-white font-medium mb-3 w-full shadow-sm"
            >
              Register
            </button>
            
            {/* Status Messages */}
            {state.message && (
              <div className="text-red-600 bg-red-50 border border-red-100 p-3 rounded-md text-sm font-medium">
                Error: {state.message}
              </div>
            )}
            
            {state.success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-md text-sm font-medium text-center">
                Registration Successful!
              </div>
            )}
          </div>
        </div>
      </form>

    </div>
  );
}