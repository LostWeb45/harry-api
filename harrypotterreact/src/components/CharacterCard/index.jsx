function CharacterCard({ name, age, image, school, key }) {
  return (
    <div className="card-block">
      <div className="card-img">
        <img src={"http://localhost:3000/static/" + image} alt={image} />
      </div>

      <div className="card-text" key={key}>
        <h3>{name}</h3>
        <p>House: {school.name}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
