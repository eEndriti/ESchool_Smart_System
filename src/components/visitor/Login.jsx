import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl animate-pulse absolute -top-10 -left-20" />
        <div className="w-96 h-96 bg-black-600 rounded-full opacity-20 blur-3xl animate-ping absolute -bottom-10 -right-20" />
      </div>

      <div className="relative z-10 backdrop-blur-xl bg-white/10 p-10 rounded-xl border border-white/20 shadow-2xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          Role-based access only. Contact admin if you can't log in.
        </p>
      </div>
    </div>
  );
};

export default Login;
