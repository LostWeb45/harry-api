import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Header from "./components/header";

function App() {
  const [schools, setSchools] = useState([]);

  const [imputvaue, setImputvaue] = useState("");
  const [inputschool, setinputschool] = useState("Все школы");

  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/schools")
      .then((data) => {
        return data.json();
      })
      .then((schools) => {
        // console.log(schools);
        setSchools(schools);
      });
  }, []);
  // useEffect(() => {
  //   // console.log(imputvaue);

  //   if (imputvaue.length == 0 && inputschool == "Все школы") {
  //     fetch("http://localhost:3000/characters")
  //       .then((data) => {
  //         return data.json();
  //       })
  //       .then((characters) => {
  //         // console.log(characters);
  //         setCharacters(characters);
  //       });
  //   } else if (imputvaue.length > 0 && inputschool == "Все школы") {
  //     setCharacters([]);
  //     fetch(`http://localhost:3000/characters?name=${imputvaue}`)
  //       .then((data) => {
  //         return data.json();
  //       })
  //       .then((characters) => {
  //         // console.log(characters);
  //         setCharacters(characters);
  //       });
  //   } else if (imputvaue.length == 0 && inputschool > 0) {
  //     setCharacters([]);
  //     fetch(`http://localhost:3000/characters?schoolId=${inputschool}`)
  //       .then((data) => {
  //         return data.json();
  //       })
  //       .then((characters) => {
  //         // console.log(characters);
  //         setCharacters(characters);
  //       });
  //   } else {
  //     fetch(
  //       `http://localhost:3000/characters?schoolId=${inputschool}&name=${imputvaue}`
  //     )
  //       .then((data) => {
  //         return data.json();
  //       })
  //       .then((characters) => {
  //         // console.log(characters);
  //         setCharacters(characters);
  //       });
  //   }
  //   console.log(inputschool);
  // }, [imputvaue, inputschool]);
  useEffect(() => {
    const url = `http://localhost:3000/characters?${
      inputschool !== "Все школы" ? `schoolId=${inputschool}` : ""
    }${imputvaue.length > 0 ? `&name=${imputvaue}` : ""}`;
    fetch(url)
      .then((data) => data.json())
      .then((characters) => setCharacters(characters))
      .catch((error) => console.error("Error fetching data:", error));
  }, [imputvaue, inputschool]);

  return (
    <div className="App">
      <Header
        schools={schools}
        setImputvaue={setImputvaue}
        setinputschool={setinputschool}
      />
      <CharacterList characters={characters} />
    </div>
  );
}

export default App;
