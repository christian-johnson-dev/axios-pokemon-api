import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1010")
      .then((response) => {
        setPokemonData(response.data.results);
      });
  }, []);
  return (
    <div className="App">
      <h1>Gimme some Pokemon.</h1>
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
