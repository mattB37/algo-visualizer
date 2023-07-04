const NavBar = () => {
  return (
    <div className="mt-0 text-white bg-blue-800">
      <div className="flex flex-row p-5 justify-between">
        <div className="flex flex-row gap-10 pr-5">
          <a className="hover:text-slate-950 underline" href="/algo-visualizer">
            About
          </a>
          <a
            className="hover:text-slate-950 underline"
            href="/algo-visualizer/sort-visualizer"
          >
            Sorting Visualizer
          </a>
          <a
            className="hover:text-slate-950 underline"
            href="/algo-visualizer/graph-visualizer"
          >
            Graph Visualizer
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
