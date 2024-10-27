import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const db = new (sqlite3.verbose().Database)(":memory:");
const app = express();

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS movie (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      release_date DATE NOT NULL);
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS actor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL);
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS movie_actor (
      movie_id INTEGER NOT NULL,
      actor_id INTEGER NOT NULL,
      FOREIGN KEY(movie_id) REFERENCES movie(id),
      FOREIGN KEY(actor_id) REFERENCES actor(id));
  `);

  const movieStmt = db.prepare(
    "INSERT INTO movie (title, release_date) VALUES (?, ?)"
  );
  const actorStmt = db.prepare(
    "INSERT INTO actor (first_name, last_name) VALUES (?, ?)"
  );
  const movieActorStmt = db.prepare(
    "INSERT INTO movie_actor (movie_id, actor_id) VALUES (?, ?)"
  );

  movieStmt.run("The Mist", "2007-11-21");
  movieStmt.run("Event Horizon", "1997-08-15");
  movieStmt.run("In The Mouth of Madness", "1995-02-03");
  movieStmt.run("Late Night with The Devil", "2024-03-22");
  movieStmt.run("Rosemary's Baby", "1968-06-12");
  movieStmt.run("The Shining", "1980-06-23");
  movieStmt.run("Cat Soup", "2001-02-21");
  movieStmt.run("The Matrix", "1999-03-31");

  actorStmt.run("Thomas", "Jane");
  actorStmt.run("Laurie", "Holden");
  actorStmt.run("Melissa", "Mcbride");
  actorStmt.run("Andre", "Braugher");
  actorStmt.run("Sam", "Neill");
  actorStmt.run("Laurence", "FishBurne");
  actorStmt.run("Julie", "Carmen");
  actorStmt.run("David", "Dastmalchain");
  actorStmt.run("Mia", "Farrow");
  actorStmt.run("Shelley", "Duvall");
  actorStmt.run("Jack", "Nicholson");

  movieActorStmt.run(1, 1);
  movieActorStmt.run(1, 2);
  movieActorStmt.run(1, 3);
  movieActorStmt.run(1, 4);
  movieActorStmt.run(2, 5);
  movieActorStmt.run(2, 6);
  movieActorStmt.run(8, 6);
  movieActorStmt.run(3, 5);
  movieActorStmt.run(3, 7);
  movieActorStmt.run(4, 8);
  movieActorStmt.run(5, 9);
  movieActorStmt.run(6, 10);
  movieActorStmt.run(6, 11);
});

app.use(cors());
app.use(express.json());

app.get("/actors", (req, res) => {
  db.all("SELECT * FROM actor", (err, rows) => {
    if (err) {
      return res.statusCode(500).json({ error: "Internal Serve Error" });
    }

    res.json(rows);
  });
});

app.listen(5041, function () {
  console.log(`Address: http://localhost:5041/`);
});
