import React, { useEffect, useState } from 'react'
import PokemonThumb from './PokemonThumb';
import './App.css';

function App() {

  const[allPokemons, setAllPokemons] = useState([]);
  const [loadmore, setLoadmore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemon = async()=>{
    const res = await fetch(loadmore);
    const data = await res.json();
    // console.log(data);
    setLoadmore(data.next);

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemon()
   }, [])

  
  return (
    <div className="app-container">
      <h1>Pokemon Evo</h1>
      <div className="pokemon-container">
        <div className="all-container">
        {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}

        </div>
        <button className="load-more"   onClick={() => getAllPokemon()} >load more</button>
      </div>
    </div>
  );
}

export default App;
