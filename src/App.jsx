import { useState, useEffect } from "react";

function App() {
  const [actors, setActors] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:5041/actors");
        if (response.status >= 400) {
          setErr("Server error");
          return;
        }

        const actorsArr = await response.json();
        setActors(actorsArr);
      } catch (err) {
        setErr(err);
      }
    })();
  }, []);

  if (err) {
    return <p>A network error was encountered.</p>;
  }

  return (
    <>
      {actors === null && <p>Loading...</p>}
      {actors && actors.length === 0 && <p>No actors were found.</p>}
      {actors && actors.length && (
        <ul>
          <li>
            <h3>Actors list</h3>
          </li>
          {actors.map((actor) => (
            <li key={actor.id}>{actor.first_name + " " + actor.last_name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
