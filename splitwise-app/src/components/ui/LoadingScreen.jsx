const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center">
        <svg className="w-6 h-6 text-brand-400 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
      <p className="text-slate-500 text-sm font-medium animate-pulse">Loading...</p>
    </div>
  </div>
);

export default LoadingScreen;
