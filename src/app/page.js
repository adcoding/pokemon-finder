"use client";
import React, { useState } from 'react';
import './globals.css'

export default function Home() {
  const [pokemonName, setPokemonName] = useState('ditto')
  const [chosen, setChosen] = useState(false)
  const [pokemonData, setPokemonData] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
    description: ""
  })

  const searchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => response.json())
      .then((response) => {
        const pokemonId = response.id;
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`)
          .then((speciesResponse) => speciesResponse.json())
          .then((speciesData) => {

            const englishEntry = speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            );

            const cleanedDescription = englishEntry
            ? englishEntry.flavor_text.replace(/[\n\f]/g, " ")
            : "No description available.";
  
            setPokemonData({
              name: pokemonName,
              species: response.species.name,
              img: spriteUrl,
              hp: response.stats[0].base_stat,
              attack: response.stats[1].base_stat,
              defense: response.stats[3].base_stat,
              type: response.types[0].type.name,
              description: cleanedDescription
            });
            setChosen(true);
          });
      });
  };
  
  

  return (
    <div className='app'>
      <h1>Pokemon Finder</h1>
      <div className='search-bar-container'>
        <input input="text" onChange={(e) => {setPokemonName(e.target.value)}} placeholder='Choose a pokemon'/>
        <button onClick={searchPokemon}>search</button>
      </div>

      <div className='result-container'>
        {!chosen ? (
          <div></div>
        ) : (
          <div className='pokemon-card'>
            <div className='card-title'>
              <h2>{pokemonData.name}</h2>
              <p>HP: {pokemonData.hp}</p>
            </div>
            <div className='pokemon-bg'>
              <img src={pokemonData.img} width='280' alt={`${pokemonData.name} sprite`} />
            </div>
            <p className="pokemon-description">{pokemonData.description}</p>
            <div className='stats'>
              <p>Type: {pokemonData.type}</p>
              <p>ATK: {pokemonData.attack}</p>
              <p>DEF: {pokemonData.defense}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


