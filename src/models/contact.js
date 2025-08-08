import mongoose, { mongo } from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: String,
    email: String,
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'label'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    photo: {
        type: String,
        default: null,
    },
}, { timestamps: true });

export const Contact = mongoose.model('Contact' , contactSchema);