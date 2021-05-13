// här skrivs funktioner/regler kring hur det går till när man gör anropen
import UserModel from '../models/User.model.js';
import StatusCode from '../configurations/StatusCodes.js'

// request = infon som skickas med när man skapar användare
// response = det som sedan returneras
const createUser = async (request, response) => {
    const user = new UserModel({
        // request för att nå värdena
        username: request.body.username,
        password: request.body.password
    })

    try {
        // save-funktionen sparar informationen inuti user till databasen
        // om await user funkade = statuskod 201 (betyder "Ok created")
        const databaseResponse = await user.save()
        response.status(StatusCode.CREATED).send(databaseResponse)
    } catch (error) {
        // om infon som skickades till backenden inte lyckas lagras i databasen, hopp in i catchen - meddelande om vad som gått fel
        // statuskod 500 (anrop nådde servern, men servern misslyckades med att hantera anropet)
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const getAllUsers = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find()
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const getUserByID = async (request, response) => {
    try {
        const databaseResponse = await UserModel.findOne({ _id: request.params.userId })
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) { 
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const deleteUserByID = async (request, response) => {
    try {
        // färdiga funktioner från express + mongoose
        const databaseResponse = await UserModel.findByIdAndDelete(request.params.userId)
        response.status(StatusCode.OK).send({
            message: `Succesfully deleted the user: ${databaseResponse.username}`
        })
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occured while trying to delete user with id: ${request.params.userId}`,
            stackTrace: error.message
        }) 
    }
}

const updateUser = async (request, response) => {
    if(!request.body.username) {
        return response.status(StatusCode.BAD_REQUEST).send({message: 'empty values are not valid'})
    }
    const data = {
        username: request.body.username,
        password: request.body.password
    }

    try {
        const databaseResponse = await UserModel.findOneAndUpdate(request.params.userId, data, {new: true})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const getUserWithQuery = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find({ username: request.query.name })
        databaseResponse.length !== 0
            ? response.status(StatusCode.OK).send(databaseResponse)
            : response.status(StatusCode.NOT_FOUND).send({message: `could not find user ${request.query.name}`})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

export default {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUserByID,
    getUserWithQuery
}