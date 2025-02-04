function SearchBar({ schools, setImputvaue, setinputschool }) {
  return (
    <div className="header-input">
      <label for="input-name">
        Name
        <input
          className="name-input"
          name="input-name"
          type="text"
          placeholder="Hermione"
          onChange={(e) => setImputvaue(e.target.value)}
        />
      </label>

      <label for="input-school">
        School
        <select
          name="input-school"
          className="name-school"
          id="input-school"
          onChange={(e) => setinputschool(e.target.value)}
          // onChange={(e) => console.log(e)}
        >
          <option selected>Все школы</option>

          {schools &&
            schools.map((school) => {
              return (
                <option key={school.name} value={school.id}>
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
