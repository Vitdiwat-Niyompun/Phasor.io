"use client"
import { useActionState } from "react";
import { register } from "./action";

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
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="font-semibold">Hello App</div>
          </div>
        </nav>

        <div>
          <form action={formAction}>
            <h1 className="">Register Form</h1>

            <div className="w-full max-w-md flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullname">Fullname</label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="rounded-md px-4 py-2 border"
                  placeholder="Name Surname"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="rounded-md px-4 py-2 border"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="tel">Tel</label>
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  className="rounded-md px-4 py-2 border"
                  placeholder="Tel"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="file">File (1MB or 1024KB)</label>
                <input
                  id="file"
                  name="attachment"
                  type="file"
                  className="rounded-md px-4 py-2 border"
                  placeholder="File"
                />
              </div>

              <div>
                <button type="submit" className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-full">
                  Register
                </button>
                {state.message && <div>Error: {state.message}</div>}
                {state.success && (
                  <div className="bg-green-500 p-4">Register Successful !</div>
                )}
              </div>
            </div>
          </form>
        </div>

        <footer className="w-full flex items-center justify-center border-t py-16">Footer</footer>
      </div>
    </main>
  );
}