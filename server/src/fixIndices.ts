import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon');
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.collection('users');

        // List indexes before
        const indexes = await collection.indexes();
        console.log('Indexes before:', indexes);

        // Drop the problematic username index
        try {
            await collection.dropIndex('username_1');
            console.log('Successfully dropped username_1 index');
        } catch (err: any) {
            console.log('Could not drop username_1 index (might not exist):', err.message);
        }

        console.log('Indexes fixed. You can now register with email.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing indexes:', error);
        process.exit(1);
    }
};

fixIndexes();
