const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/accounts.json');

if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
}

const authService = {
  getAllUsers: () => {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      if (!data.trim()) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users.json:', error);
      return [];
    }
  },

  getUserByEmail: (email) => {
    const users = authService.getAllUsers();
    return users.find(user => user.email === email);
  },

  getUserById: (id) => {
    const users = authService.getAllUsers();
    return users.find(user => user.id === id);
  },

  createUser: (newUser) => {
    const users = authService.getAllUsers();
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  },
};

module.exports = authService;