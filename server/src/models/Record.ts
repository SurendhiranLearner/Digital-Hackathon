import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true, default: 'Active' },
    value: { type: Number, required: false }, // Made optional
    category: { type: String, required: false }, // Made optional
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: link to user
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);
export default Record;
