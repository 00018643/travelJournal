const noteService = require("../services/travelnotesService");
const { v4: uuidv4 } = require("uuid");

const noteController = {
  getAllNotes: (req, res) => {
    const notes = noteService.getAllNotes();
    res.render("notes", { notes, user: req.user });
  },

  createNote: (req, res) => {
    const { user_id, title, city, country, latitude, longitude, experience, weather } = req.body;
    
    const newNote = {
      id: uuidv4(),
      user_id: user_id || 'guest',
      title,
      location: {
        city,
        country,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
      },
      experience,
      weather: weather || { temperature: 0, condition: 'Unknown' }, 
      created_date: new Date().toISOString().split("T")[0],
    };

    noteService.createNote(newNote);
    res.redirect("/notes");
  },

  updateNot: (req, res) => {
    const { title, city, country, latitude, longitude, experience, weather } = req.body;
  
    const updatedNote = {
      title,
      location: {
        city,
        country,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
      },
      experience,
      weather: weather || { temperature: 0, condition: 'Unknown' }, 
      updated_date: new Date().toISOString().split("T")[0],
    };
  
    noteService.updateNote(req.params.id, updatedNote);
    res.redirect("/notes");
  },

  getNoteById: (req, res) => {
    const note = noteService.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.render("edit", { note, user: req.user });
  },

  removeNote: (req, res) => {
    noteService.deleteNote(req.params.id);
    res.redirect('/notes');
  },
};

module.exports = noteController;