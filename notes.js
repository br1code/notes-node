const fs = require("fs");

let fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync("notes-data.json"));
    } catch (error) {
        return [];
    }
};

let saveNotes = notes => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {title, body};
    if (notes.every(note => note.title !== title)) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    return fetchNotes();
};

let readNote = title => {
    let notes = fetchNotes();
    return notes.find(note => note.title === title);
};

let removeNote = title => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}

let logNote = (note, msg = "") => {
    console.log(msg);
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
};