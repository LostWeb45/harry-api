import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Header from "./components/header";

function App() {
  const [schools, setSchools] = useState([]);

  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/schools")
      .then((data) => {
        return data.json();
      })
      .then((schools) => {
        console.log(schools);
        setSchools(schools);
      });

    fetch("http://localhost:3000/characters")
      .then((data) => {
        return data.json();
      })
      .then((characters) => {
        console.log(characters);
        setCharacters(characters);
      });
  }, []);

  return (
    <div className="App">
      <Header schools={schools} />
      <CharacterList characters={characters} />
    </div>
  );
}

export default App;
