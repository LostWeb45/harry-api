import CharacterCard from "../CharacterCard";

function CharacterList({ characters }) {
  return (
    <div className="cards">
      {characters &&
        characters.map((character, id) => {
          return (
            <CharacterCard
              key={id}
              name={character.name}
              age={character.age}
              school={character.School}
              image={character.image}
            />
          );
        })}
    </div>
  );
}

export default CharacterList;
