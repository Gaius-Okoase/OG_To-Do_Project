import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectToDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
         throw new Error('MONGO_URI environment variable is not set');
        }
        
        await mongoose.connect(mongoUri);
        console.log('Successfully connected to MongoDB.');
        return mongoose.connection;
    } catch (error) {
        console.log(error instanceof Error ? error.message : 'Failed to connect to DB');
        process.exit(1);
    }
}

export default connectToDb;