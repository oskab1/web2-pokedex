import React, { useState, useEffect } from 'react';
import './poke-card.css';

function PokeCard({ pokemon, onPokemonClick }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => { // Asynchronous function to fetch details of each pokemon
      const details = await Promise.all( // Concurrently fetch details for each pokemon using Promise.all
        pokemon.map(async name => { // Map each pokemon name to a fetch request
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // Fetch pokemon details from PokeAPI
          const data = await response.json(); // Parse response JSON data
          return data; // Return pokemon details
        })
      );
      setPokemonDetails(details); // Update pokemonDetails state with fetched details
    };

    fetchPokemonDetails(); // Invoke fetchPokemonDetails function
  }, [pokemon]); // Dependency: Runs effect whenever pokemon state changes

  return (
    <div className="pokemon-container">
      {pokemonDetails.map(pokemon => (
        <div
          className={`pokemon-card ${pokemon.types[0].type.name}`}
          key={pokemon.id}
          onClick={() => onPokemonClick(pokemon.name)}
        >
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokeCard;