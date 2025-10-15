import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB.');
        return mongoose.connection;
    } catch (error) {
        console.log('Failed to connect to DB:', error);
        process.exit(1);
    }
}

export default connectToDb;