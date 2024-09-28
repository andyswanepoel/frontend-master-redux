import Characters from "./Characters";
import FetchCharacters from "./FetchCharacters";

export const App = () => {
  return (
    <div className="Application">
      <h1>Star Wars Characters</h1>
      <FetchCharacters />
      <Characters />
    </div>
  );
};
