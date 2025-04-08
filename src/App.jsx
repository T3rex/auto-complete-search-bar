import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});

  const normalizeInput = (input) => input.trim().toLowerCase();

  const getFilteredRecipes = (recipes, input) => {
    const startsWithMatches = recipes.filter((recipe) =>
      recipe.name.toLowerCase().startsWith(input)
    );

    const startsWithIds = new Set(startsWithMatches.map((r) => r.id));

    const includesMatches = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(input) &&
        !startsWithIds.has(recipe.id)
    );

    return [...startsWithMatches, ...includesMatches];
  };

  const updateCacheAndResults = (input, results) => {
    setCache((prev) => ({ ...prev, [input]: results }));
    setResults(results);
  };

  const fetchRecipesFromAPI = async (input) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${input}`
    );
    const json = await response.json();
    return json.recipes || [];
  };

  const fetchData = async () => {
    const normalizedInput = normalizeInput(input);

    if (cache[normalizedInput]) {
      setResults(cache[normalizedInput]);
      return;
    }

    const recipes = await fetchRecipesFromAPI(normalizedInput);
    const filteredRecipes = getFilteredRecipes(recipes, normalizedInput);
    updateCacheAndResults(normalizedInput, filteredRecipes);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const getBoldText = (text, input) => {
    let index = text.toLowerCase().indexOf(input);
    let preText = text.substring(0, index);
    let middleText = text.substring(index, index + input.length);
    let postText = text.substring(index + input.length, text.length);
    return [preText, middleText, postText];
  };

  return (
    <div className="App">
      <h1>Auto-Complete Search bar</h1>
      <input
        type="text"
        className="search-bar"
        onChange={(e) => setInput(e.target.value.toLowerCase())}
      />
      {input && (
        <div className="result-container">
          {results.map((res) => (
            <div className="result" key={res.id}>
              {getBoldText(res.name, input).map((text, index) =>
                text.toLowerCase() == input.toLowerCase() ? (
                  <b key={index}>{text}</b>
                ) : (
                  <span key={index}>{text}</span>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
