function SearchBar({ schools }) {
  return (
    <div className="header-input">
      <label for="input-name">
        Name
        <input
          className="name-input"
          name="input-name"
          type="text"
          placeholder="Hermione"
        />
      </label>

      <label for="input-school">
        School
        <select name="input-school" className="name-school" id="input-school">
          <option def={"Невозможно"} disabled selected>
            Choose one
          </option>
          {schools &&
            schools.map((school) => {
              return (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              );
            })}
          {/* <option value="Пуффендуй">Пуффендуй</option>
          <option value="Слизерин">Слизерин</option>
          <option value="Когтевран">Когтевран</option> */}
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
