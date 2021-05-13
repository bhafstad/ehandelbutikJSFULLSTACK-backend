import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
    username: {
        type: String,
        // ska ej kunna finnas två användare med samma username
        unique: true,
        // ska ej gå ha noll-värden, bara strängar som usernames
        allowNull: false,
        // man kan inte skicka med tom sträng
        required: true,
        lowercase: true,
        // minlängd och andra argumentet är error som visas om username kortare än 5
        minLength: [5, 'username must be longer than 5 characters'],
        maxLength: [20, 'username is too long']
    },
    password: {
        type: String,
        allowNull: false,
        required: true  
    }
})

// första argumentet - vad den ska heta i databasen
const UserModel = mongoose.model('user', userSchema);
export default UserModel;
