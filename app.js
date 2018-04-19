const yargs = require("yargs");

const notes = require("./notes.js");

// arguments configs
const options = {
    title: {
        describe: "Title of note",
        demand: true,
        alias: "t"
    },
    body: {
        describe: "Body of note",
        demand: true,
        alias: "b",
    }
};

// arguments
let argv = yargs
    .command("add","Add a new note",{
        title: options.title,
        body: options.body
    })
    .command("list","List all notes")
    .command("read","Read a note",{
        title: options.title
    })
    .command("remove","Remove a note",{
        title: options.title
    })
    .help()
    .argv;
let command = argv._[0];


let app = {

    add: () => {
        let note = notes.addNote(argv.title,argv.body);
        if (note) {
            notes.logNote(note,"The note was created");
        } else {
            console.log("Note title already used");
        }
    },

    list: () => {
        let allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} notes..`);
        allNotes.forEach(note => notes.logNote(note));
    },

    read: () => {
        let note = notes.readNote(argv.title);
        if (note) {
            notes.logNote(note,"Note found");
        } else {
            console.log("Note not found");
        }
    },

    remove: () => {
        let removed = notes.removeNote(argv.title);
        let msg = removed ? "Note removed" : "Note not found";
        console.log(msg);
    },
    
    default: () => {
        console.log("Command not recognized");
    }
};


try {
    app[command]();
} catch (error) {
    app.default();
}



