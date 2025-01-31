import CharacterCard from "../CharacterCard";

function CharacterList({ characters }) {
  return (
    <div class="cards">
      {characters &&
        characters.map((character, id) => {
          return (
            <CharacterCard
              key={id}
              name={character.name}
              age={character.age}
              schoolid={character.schoolId}
              image={character.image}
            />
          );
        })}
    </div>
  );
}

export default CharacterList;
