const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/accounts.json');

if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
}

const userService = {
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

  getUserById: async (userId) => {
    const users = userService.getAllUsers();
    return users.find(user => user.id == userId) || null;
  },

  updateUserEmail: async (userId, newEmail) => {
    const users = userService.getAllUsers();
    const userIndex = users.findIndex(user => user.id == userId);
    if (userIndex === -1) {
      return null;
    }
    users[userIndex].email = newEmail;
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      return users[userIndex];
    } catch (error) {
      console.error('Error writing users.json:', error);
      return null;
    }
  }
};

module.exports = userService;
