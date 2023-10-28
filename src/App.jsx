import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./assets/pages/Home";
import Pokedex from "./assets/pages/Pokedex";
import PokemonDetail from "./assets/pages/PokemonDetail";
import Private from "./components/Private";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Private />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
