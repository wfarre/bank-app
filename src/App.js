import "./App.css";

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Hero from "./Components/Home/Hero";
import Features from "./Components/Home/Features";

function App() {
  // const isLoggedIn

  // console.log(isLoggedIn);

  return (
    <div className="App">
      <NavBar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
