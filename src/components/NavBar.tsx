import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="mt-0 text-white bg-blue-800">
      <div className="flex flex-row p-5 justify-between">
        <div className="flex flex-row gap-10 pr-5">
          <Link className="hover:text-slate-950 underline" to="/">
            About
          </Link>
          <Link
            className="hover:text-slate-950 underline"
            to="/sort-visualizer"
          >
            Sorting Visualizer
          </Link>
          <Link
            className="hover:text-slate-950 underline"
            to="/graph-visualizer"
          >
            Graph Visualizer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
