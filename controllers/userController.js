const userService = require('../services/userService');

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`got the user id: ${userId}`)
    const userData = await userService.getUserById(userId);

    if (req.user.id !== userId) {
      return res.status(403).render('userProfile', {
        userId: userId,
        userData: null,
        user: req.user,
        error: 'Unauthorized access',
        success: null
      });
    }

    res.render('userProfile', {
      userId: userId,
      userData: userData,
      user: req.user || null, 
      error: null,
      success: null
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.render('userProfile', {
      userId: req.params.id,
      userData: null,
      user: req.user || null,
      error: 'Server error',
      success: null
    });
  }
};

exports.updateUserEmail = async (req, res) => {
 
  try {
    const { email } = req.body;

    const userId = req.params.id; 
    console.log(`updating the user of the user id: ${userId}`)

    if (req.user.id !== userId) {
      return res.status(403).render('userProfile', {
        userId: userId,
        userData: null,
        user: req.user,
        error: 'Unauthorized access',
        success: null
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      const userData = await userService.getUserById(userId);
      return res.render('userProfile', {
        userId: userId,
        userData: userData,
        user: req.user || null,
        error: 'Invalid email',
        success: null
      });
    }

    const updatedUser = await userService.updateUserEmail(userId, email);

    if (!updatedUser) {
      return res.render('userProfile', {
        userId: userId,
        userData: null,
        user: req.user || null,
        error: 'User not found',
        success: null
      });
    }

    res.render('userProfile', {
      userId: userId,
      userData: updatedUser,
      user: req.user || null,
      error: null,
      success: 'Email updated successfully'
    });
  } catch (error) {
    console.error('Error updating user email:', error);
    const userData = await userService.getUserById(userId);
    res.render('userProfile', {
      userId: userId,
      userData: userData,
      user: req.user || null,
      error: 'Server error',
      success: null
    });
  }
};