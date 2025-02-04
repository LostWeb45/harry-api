import SearchBar from "../SearchBar";
import "../style.css";
function Header({ schools, setImputvaue, setinputschool }) {
  return (
    <header>
      <div className="header-block">
        <div className="header-text">
          <h1>Harry Potter</h1>
          <h2>View all characters from the Harry Potter universe</h2>
        </div>
        <SearchBar
          schools={schools}
          setImputvaue={setImputvaue}
          setinputschool={setinputschool}
        />
      </div>
    </header>
  );
}

export default Header;
