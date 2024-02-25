import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isColorChanging, setIsColorChanging] = useState(false);
  const [textColor, setTextColor] = useState("#2196F3");

  useEffect(() => {
    const colors = ["#2196F3", "#E91E63", "#FF9800", "#4CAF50"];

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setIsColorChanging(true);
      currentIndex = (currentIndex + 1) % colors.length;
      setTextColor(colors[currentIndex]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTransitionEnd = () => {
    setIsColorChanging(false);
  };

  return (
    <div className="bg-black h-screen text-white">
      <div className="h-screen justify-center flex-col flex items-center">
        <div className="px-4 py-2 rounded-3xl mb-4 text-shadow">
          <p className="text-sm font-bold text-center">
            Welcome to Invento {String.fromCodePoint(0x2728)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 mb-4">
          <h1 className="text-6xl font-bold text-center">
            Smart Inventory
          </h1>
          <h1
            className={`text-8xl font-bold text-center ${
              isColorChanging ? "color-changing-text" : ""
            }`}
            style={{ color: textColor }}
            onTransitionEnd={handleTransitionEnd}
          >
            Management System
          </h1>
          <h1 className="text-6xl font-bold text-center">for Farmers</h1>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-4">
          <p className="text-2xl text-zinc-400 text-center">
            Transforming Agriculture, Sowing Tomorrow's Harvest.
            Empowering Farmers, Cultivating Change.
          </p>
          <a
            href="/simulator"
            className="px-4 py-2 rounded-md bg-blue-800 font-bold"
          >
            Launch Simulator -&gt;
          </a>
        </div>
      </div>

      <style jsx>{`
        .color-changing-text {
          transition: color 1s ease-in-out;
        }

        .text-shadow {
          box-shadow: 0 0 50px ${textColor};
          border: 1px solid ${textColor};
          transition: all 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}
