import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectToDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
         throw new Error('MONGO_URI environment variable is not set');
        }
// Now mongoUri is guaranteed to be a string
        await mongoose.connect(mongoUri);
        console.log('Successfully connected to MongoDB.');
        return mongoose.connection;
    } catch (error) {
        console.log('Failed to connect to DB:', error);
        process.exit(1);
    }
}

export default connectToDb;