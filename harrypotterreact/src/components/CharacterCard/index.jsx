function CharacterCard({ name, age, image, schoolid, key }) {
  return (
    <div class="card-block">
      <div class="card-img">
        <img src={"http://localhost:3000/static/" + image} alt={image} />
      </div>

      <div class="card-text" key={key}>
        <h3>{name}</h3>
        <p>Actor: Emma Watson</p>
        <p>Gender: female</p>
        <p>House: {schoolid}</p>
        <p>Wand core: dragon heartstring</p>
        <p>Alive: yes </p>
      </div>
    </div>
  );
}

export default CharacterCard;
