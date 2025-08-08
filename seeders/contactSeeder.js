import mongoose from "mongoose";
import dotenv from 'dotenv'
import { Contact } from "../src/models/contact.js";

dotenv.config();

const contact = [
    {
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        phone: '081234567890',
    },
    {
        name: 'Citra Lestari',
        email: 'citra.lestari@example.com',
        phone: '082345678901',
    },
    {
        name: 'Dewi Anggraini',
        email: 'dewi.anggraini@example.com',
        phone: '083456789012',
    },
    {
        name: 'Eko Prasetyo',
        email: 'eko.prasetyo@example.com',
        phone: '084567890123',
    },
    {
        name: 'Fitriani Indah',
        email: 'fitriani.indah@example.com',
        phone: '085678901234',
    },
];

const seedContacts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database terhubung untuk seeder...');

        console.log('Menghapus data kontak lama...');
        await Contact.deleteMany({});
        console.log('Data lama berhasil dihapus...');

        console.log('Menambahkan data baru...');
        await Contact.insertMany(contact);
        console.log('Data baru berhasil ditambahkan...');
    } catch (error) {
        console.error('Error saat menajalankan seeder: ', error);
    } finally {
        await mongoose.disconnect();
        console.log('Koneksi database ditutup');
    }
}

seedContacts();