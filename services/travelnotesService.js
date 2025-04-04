const fs = require("fs");
const path = require("path");

const notesFilePath = path.join(__dirname, "../data/notes.json");

if (!fs.existsSync(notesFilePath)) {
  console.log(`Creating notes.json at ${notesFilePath}`);
  fs.writeFileSync(notesFilePath, JSON.stringify([], null, 2));
}

const noteService = {
  getAllNotes: () => {
    try {
      const data = fs.readFileSync(notesFilePath, "utf8");
      const notes = data.trim() ? JSON.parse(data) : [];
      console.log('All notes:', notes); 
      return notes;
    } catch (error) {
      console.error("Error reading notes.json:", error);
      return [];
    }
  },

  getNoteById: (id) => {
    const notes = noteService.getAllNotes();
    const note = notes.find((note) => note.id == id);
    console.log(`Looking for note with ID ${id}, found:`, note); 
    return note || null;
  },

  createNote: (newNote) => {
    const notes = noteService.getAllNotes();
    console.log('Creating new note:', newNote);
    notes.push(newNote);
    try {
      fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
      console.log('Note created successfully');
    } catch (error) {
      console.error("Error writing to notes.json:", error);
    }
  },

  updateNote: (id, updatedData) => {
    let notes = noteService.getAllNotes();
    console.log(`Updating note with ID ${id}:`, updatedData); 
  
    notes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          ...updatedData,
          location: {
            ...note.location,
            ...updatedData.location,
          },
          weather: {
            ...note.weather,
            ...updatedData.weather,
          },
        };
      }
      return note;
    });
  
    try {
      fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
      console.log('Note updated successfully');
    } catch (error) {
      console.error("Error writing to notes.json:", error);
    }
  },

  deleteNote: (id) => {
    const notes = noteService.getAllNotes().filter((note) => note.id !== id);
    console.log(`Deleting note with ID ${id}`); 
    try {
      fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
      console.log('Note deleted successfully');
    } catch (error) {
      console.error("Error writing to notes.json:", error);
    }
  },
};

module.exports = noteService;