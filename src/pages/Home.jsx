import React from "react";
import About from "../components/About";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    // Ensure the home content doesn't fight the Navbar for "stacking" space
    <div className="relative z-0">
      <Header />
      <About />
      <Footer />
    </div>
  );
}

export default Home;
