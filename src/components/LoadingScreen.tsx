"use client";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({
  progress,
  isLoaded,
}: LoadingScreenProps) {
  return (
    <div className={`loading-screen ${isLoaded ? "loaded" : ""}`}>
      {/* Apple Logo */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 17 21"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-2 opacity-80"
      >
        <path d="M13.174 11.168c-.026-2.61 2.133-3.862 2.23-3.923-1.213-1.775-3.104-2.019-3.778-2.047-1.608-.163-3.14.947-3.956.947-.816 0-2.078-.923-3.414-.898-1.757.026-3.377 1.022-4.282 2.594-1.826 3.17-.467 7.87 1.313 10.443.87 1.259 1.908 2.672 3.27 2.622 1.313-.053 1.81-.85 3.398-.85 1.588 0 2.036.85 3.425.823 1.413-.025 2.308-1.284 3.174-2.546.999-1.46 1.412-2.874 1.436-2.948-.031-.014-2.755-1.058-2.781-4.197zm-2.607-7.71C11.356 2.51 11.862.958 11.698 0c-1.312.053-2.903.874-3.844 1.978-.845.978-1.584 2.537-1.385 4.035 1.462.114 2.954-.743 3.748-1.978l.35-.577z" />
      </svg>

      {/* Loading percentage */}
      <p className="text-white/60 text-xs font-light tracking-widest uppercase mt-6 mb-2">
        Loading Experience
      </p>
      <p className="text-white/90 text-sm font-medium tabular-nums">
        {Math.round(progress)}%
      </p>

      {/* Progress bar */}
      <div className="loading-bar-track mt-3">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
