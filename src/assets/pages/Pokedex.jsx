import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../../components/pokedex/PokemonList";
import { current } from "@reduxjs/toolkit";
import HeaderPokeball from "../../components/Layaouts/HeaderPokeball";
import { paginateData } from "../../Utils/pagination";
const trainerName = () => {};
const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const trainerName = useSelector((store) => store.trainerName);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")


  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleChangeType = (e) =>{
    setCurrentType(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const [currentPage, setCurrenPage] = useState(1)
  const {itemsInCurrentPage, lastPage, pagesInCurrentBlock} = paginateData(pokemonsByName, currentPage)

  useEffect(() => {
    if(currentType === ""){
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=140")
      .then(({ data }) => setPokemons(data.results))
      .catch((err) => console.log(err));
  } }, [currentType]);

  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1)
    {
      setCurrenPage(newCurrentPage)
    }
  }
  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage)
    {
      setCurrenPage(newCurrentPage)
    }
  }
  useEffect(() => {
    axios
    .get("https://pokeapi.co/api/v2/type")
    .then(({data}) => setTypes(data.results))
    .catch((err) => console.log(err))

  },[])

  useEffect(() =>{
    if (currentType !== "")
    {
      axios
      .get(`https://pokeapi.co/api/v2/type/${currentType}`)
      .then(({data}) => 
      {
        setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon)) })
      .catch((err) => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrenPage(1)
  }, [currentType])

  return (
    <main>
      <HeaderPokeball />
      <section className="text-center p-7 pb-9">
        <p>
          <span className="text-red-500 text-lg">Welcome {trainerName},</span> here can
          you find your favorite pokemon.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-[repeat(auto-fit,_300px)] gap-3 justify-center p-10">
          <div className="flex">
            <input type="text" name="pokemonName" placeholder="Search one pokemon..." className="shadow-md w-54 h-10 p-4" />
            <button className="bg-red-500 text-white h-10 w-32">Search</button>
          </div>
          <div>
          <select className="capitalize w-6/12 h-10 shadow-md" onChange={handleChangeType}>
            <option value="">All pokemons...</option>
            {
              types.map((type) => (
              <option value={type.name} key={type.url}>{type.name}</option>
            ))}
          </select>
          </div>
        </form>
      </section>

      <ul className="flex justify-center gap-4 flex-wrap">
        <li>
          <button onClick={handlePreviusPage}>{"<<"}</button>
        </li>
          {pagesInCurrentBlock.map((page) => <li key={page}>
            <button
            onClick={() => setCurrenPage(page)}
             className={`p-2 text-white font-bold rounded-md ${currentPage === page ? "bg-red-500" : "bg-red-400"}`}>{page}</button>
            </li>)}
            <li>
              <button onClick={handleNextPage}>{">>"}</button>
            </li>
      </ul>


      <PokemonList pokemons={itemsInCurrentPage} />
    </main>
  );
};

export default Pokedex;
