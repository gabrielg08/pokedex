import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType } from "../../constants/pokemons";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return <Link to={`/pokedex/${pokemon?.id}`} className={`capitalize border-8 rounded-lg ${borderByType[pokemon?.types[0].type.name]} text-center`}>
    <header className={`${bgByType[pokemon?.types[0].type.name]} h-[140px]`}></header>
    <div className="relative pt-14">
    <div className="absolute top-0 -translate-y-2/3 w-full">
      <img className="max-w-[180px] mx-auto block" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
    </div>
    <div>
      <h3 className="text-xl font-semibold">{pokemon?.name}</h3>
      <span className="capitalize text-sm font-semibold">{pokemon?.types.map((type) => type.type.name).join(" / ")}</span>
      <h5 className="font-semibold text-slate-400 text-xs mb-2">Type</h5>
      <hr />
      <ul className="grid grid-cols-2 text-sm p-2 gap-4">
        {
          pokemon?.stats.slice(0,4).map((stat) => (
          <li className="grid gap-1" key={stat.stat.name}>
            <h6 className="font-semibold">{stat.stat.name}</h6>
            <span className="font-bold">{stat.base_stat}</span>
          </li>))
        }
      </ul>
    </div>
    </div>
  </Link>;
};

export default PokemonCard;
