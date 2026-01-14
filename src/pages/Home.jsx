import React from "react";
import About from "../components/About";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div style={{ margin: 0, padding: 0, width: "100%" }}>
      <Navbar />
      <Header />
      <About />
      <Footer />
    </div>
  );
}

export default Home;
