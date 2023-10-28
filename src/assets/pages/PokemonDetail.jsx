import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HeaderPokeball from '../../components/Layaouts/HeaderPokeball'

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)
  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1)
    return `${percentStat}%`
  }

  const {pokemonId} = useParams()
  console.log(pokemonId)
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({data}) => setPokemon(data))
      .catch((err) => console.log(err))
  }, [])
  return (
   <main className='text-center capitalize'>
    <HeaderPokeball />
    <article className='py-10 px-2 max-w-[400px] mx-auto'>
      <header className=''>
        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
      </header>
      <h3>#{pokemon?.id}</h3>
      <h2>{pokemon?.name}</h2>

      <section>
        
        <ul className='grid gap-4'>
          {
            pokemon?.stats.map((stat) => <li key={stat.stat.name} className='capitalize'>
              <div className='flex justify-between items-center'>
                <h5>{stat.stat.name}</h5>
                <span>{stat.base_stat}</span>
              </div>
              <div className='bg-slate-200 rounded-md h-6 overflow-hidden'>
                <div style={{width: getPercentStat(stat.base_stat)}} className={`bg-yellow-400 h-full`}></div>
              </div>

            </li>)
          }
        </ul>

      </section>
    </article>
   </main>
  )
}

export default PokemonDetail
