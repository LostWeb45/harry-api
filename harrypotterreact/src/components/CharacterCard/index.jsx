function CharacterCard({ name, age, image, school, key }) {
  return (
    <div className="card-block">
      <div className="card-img">
        <img src={"http://localhost:3000/static/" + image} alt={image} />
      </div>

      <div className="card-text" key={key}>
        <h3>{name}</h3>
        <p>Actor: Emma Watson</p>
        <p>Gender: female</p>
        <p>House: {school.name}</p>
        <p>Wand core: dragon heartstring</p>
        <p>Alive: yes </p>
      </div>
    </div>
  );
}

export default CharacterCard;
