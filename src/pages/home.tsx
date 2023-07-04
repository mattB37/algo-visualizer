import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <main>
      <NavBar></NavBar>
      <div className="App">
        <h1 className="text-4xl font-bold mb-4">Welcome to Algo Visualizer!</h1>
        <p className="mb-4">
          This app is a small personal project. I always wanted to make some
          sort of algorithm visualizer but never found time.
        </p>
        <h1 className="text-4xl font-bold mb-4">How does it work?</h1>
        <p>
          The app is built using react and typescript and is deployed through
          github pages. Since github pages only supports static websites, each
          "step" in the algorithm is stored as a state and then a list of every
          state is displayed in succession.
        </p>
        <a
          className="text-blue-500 hover:text-blue-800 underline"
          href="https://github.com/mattB37/algo-visualizer"
        >
          Github
        </a>
      </div>
    </main>
  );
};

export default Home;
