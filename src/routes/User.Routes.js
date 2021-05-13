import UserController from '../controllers/User.controller.js';

// CRUD-OPERATIONER för applikationen
const routes = application => {
    application.post('/user', UserController.createUser)
    application.get('/user', UserController.getAllUsers)
    application.get('/user/:userId', UserController.getUserByID)
    application.delete('/user/:userId', UserController.deleteUserByID)
    // put-anrop = uppdatera befintlig data
    application.put('/user/:userId', UserController.updateUser)
    application.get('/search/user', UserController.getUserWithQuery)
}

export default { routes };