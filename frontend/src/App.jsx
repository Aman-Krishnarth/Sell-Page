import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className=" bg-zinc-700 text-white">
      <nav className="flex justify-around items-center">
        <Link to="/" className="px-4 py-3 bg-blue-400 text-2xl font-semibold">
          Home
        </Link>
        <Link
          to="/sell"
          className="px-4 py-3 bg-blue-400 text-2xl font-semibold"
        >
          Sell
        </Link>
        <Link
          to="/store"
          className="px-4 py-3 bg-blue-400 text-2xl font-semibold"
        >
          Store
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
