const fs = require("fs");

const fetchData = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.txt"));
  } catch (error) {
    console.log("there is an error here", error);
    return [];
  }
};

const logNote = (note) => {
  console.log(`title: ${note.title}`);
  console.log(`body: ${note.body}`);
};

const addNote = (title, body) => {
  const notes = fetchData();
  const note = { title, body };

  const exist = notes.find((note) => note.title === title);
  console.log("exist", exist);
  if (!!exist) {
    console.log("note alreday exist");
  } else {
    notes.push(note);
    fs.writeFileSync("notes.txt", JSON.stringify(notes));
    logNote(note);
  }
};
const getAll = () => {
  const notes = fetchData();

  notes.forEach((el) => {
    logNote(el);
  });
};

const getOneNote = (title) => {
  const notes = fetchData();
  const exist = notes.find((note) => note.title === title);
  logNote(exist);
};

const removeNote = (title) => {
  const notes = fetchData();
  const note = notes.filter((note) => note.title !== title);
  fs.writeFileSync("notes.txt", JSON.stringify(note));
  logNote(note[0]);
};

module.exports = {
  addNote,
  getAll,
  getOneNote,
  removeNote,
};
