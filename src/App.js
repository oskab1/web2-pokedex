// The comments are mostly for myself to understand what the code does
// Fetching React library, styles, pokedex components and RLL components
import React, { useState, useEffect } from 'react';
import './App.css';
import PokeCard from './ui-elements/poke-card';
import PokeDetails from './ui-elements/poke-details';
import Navigation from './ui-elements/navigation';
import About from './ui-elements/about';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  // Declaring variables using hooks
  const [pokemon, setPokemon] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [urlCurrentPage, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [urlNextPage, setNextPageUrl] = useState()
  const [urlPreviousPage, setPreviousPageUrl] = useState()
  const [isLoading, setLoading] = useState(true)

  // Effect that fetches asynchronously the Pokemon data from PokeAPI endpoint and updates state variables
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    fetch(urlCurrentPage) // Fetch data from the specified URL (urlCurrentPage)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed network response status.'); // Check if the response status is not ok
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => { // Update state variables with fetched data
        setPokemon(data.results.map(p => p.name)); // Extract and set the names of Pokémon from the fetched data
        setLoading(false); // Set loading state to false after fetching data
        setNextPageUrl(data.next); // Set next page URL
        setPreviousPageUrl(data.previous); // Set previous page URL
      })
      .catch(error => {
        console.error('Fetch error:', error); // Handle fetch errors (e.g., network errors)
        setLoading(false); // Set loading state to false in case of an error
      });
  }, [urlCurrentPage]); // Run the effect whenever the 'urlCurrentPage' dependency changes

  if (isLoading) return "Loading..."

  async function fetchPokemonDetails(name) { // Fetch pokemon details from PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }

  async function handlePokemonClick(name) { // If the pokemon is clicked, select it
    const details = await fetchPokemonDetails(name);
    setSelectedPokemon(details);
  }

  function handleCloseDetails() { // If the details are closed, unselect pokemon
    setSelectedPokemon(null);
  }

  function goToNextPage() { // Go to next page
    setCurrentPageUrl(urlNextPage)
  }

  function goToPreviousPage() { // Go to previous page
    setCurrentPageUrl(urlPreviousPage)
  }

  return (
    <Router> 
      <div className="app-container">
        <nav>
          <Link to="/pokedex">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <h1>PokeAPI Pokedex</h1>
        <Routes>
  <Route path="/about" element={<About />} />
  <Route path="/pokedex" element={
    <>
      <PokeCard pokemon={pokemon} onPokemonClick={handlePokemonClick} />
      <Navigation
        goToNextPage={urlNextPage ? goToNextPage : null}
        goToPreviousPage={urlPreviousPage ? goToPreviousPage : null}
      />
      {selectedPokemon && (
        <PokeDetails details={selectedPokemon} onClose={handleCloseDetails} />
      )}
    </>
  } />
</Routes>
      </div>
    </Router>
  );
}

export default App;

