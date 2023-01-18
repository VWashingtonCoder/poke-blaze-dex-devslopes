async function fetchPokemonTypes() {
  const allTypesUrl = "https://pokeapi.co/api/v2/type";

  try {
    let res = await fetch(allTypesUrl);
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}
async function getPokemonByRange(gen) {
  const { offset, limit } = genParams[gen];
  const rangeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    let res = await fetch(rangeUrl);
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}
async function getPokemonByType(type) {
  const typeUrl = `https://pokeapi.co/api/v2/type/${type}`;
  try {
    let res = await fetch(typeUrl);
    let data = await res.json();
    return data.pokemon;
  } catch (err) {
    console.log(err);
  }
}
async function getPokemonByName(name) {
    const nameUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        let res = await fetch(nameUrl);
        let data = await res.json();
        return data
      } catch (err) {
        console.log(err);
      }
}