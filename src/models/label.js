import mongoose from "mongoose";
import { Contact } from "./contact.js";

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

labelSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        const labelId = doc._id;

        await Contact.updateMany(
            { labels: labelId },
            { $pull: { labels: labelId } }
        );

        console.log(`Referensi untuk label ${labelId} telah dihapus semua dari kontak`);
    }
});

export const Label = mongoose.model('Label' ,labelSchema);