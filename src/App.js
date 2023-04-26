import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  // 1) Set up our state
  const [pokemonData, setPokemonData] = useState([]);

  // 2) useEffect to make our API call
  useEffect(() => {
    getAllPokemon();
  }, []);

  // 3) Fetch the list of pokemon from the API
  const getAllPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1008")
      .then((responseAll) => {
        // 4) Extract the data from the responseAll
        const results = responseAll.data.results;
        // 3) For each pokemon, fetch the data from the API
        const getOnePokemon = results.map((pokemon) => {
          return axios.get(pokemon.url).then((responseOne) => {
            // 4) Extract the data from the responseOne
            const oneData = responseOne.data;
            return {
              id: oneData.id,
              name: oneData.name,
              image: oneData.sprites.front_default,
            };
          });
        });
        // 5) Wait for all the promises to finish
        Promise.all(getOnePokemon).then((getAllPokemon) => {
          // 6) Set the data to state
          setPokemonData(getAllPokemon);
        });
      });
  };

  return (
    <div className="App">
      <h1>
        Gimme <span className="strikethrough">some</span> All Pokemon.
      </h1>
      <div className="pokeWrapper">
        {/* map the useState data */}
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id} className="pokeCard">
            <h3>{pokemon.name}</h3>
            <span>ID: {pokemon.id}</span>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
