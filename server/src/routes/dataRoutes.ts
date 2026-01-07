import express from 'express';
import { protect } from '../middleware/authMiddleware';
import Record from '../models/Record';

const router = express.Router();

// GET /api/data - Protected route
router.get('/', protect, async (req, res) => {
    try {
        // Fetch all records. In a real app, you might filter by req.user.id
        const records = await Record.find({});

        // If no records exist, seed some sample data for demonstration
        if (records.length === 0) {
            const sampleData = [
                { name: 'John Doe', email: 'john@example.com', status: 'Active', value: 100, category: 'A' },
                { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', value: 200, category: 'B' },
                { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', value: 300, category: 'A' },
            ];
            await Record.insertMany(sampleData); // Insert without user association for now
            return res.json(await Record.find({}));
        }

        res.json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/data - Create a new record
router.post('/', protect, async (req, res) => {
    try {
        const { name, email, status, value, category } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Please provide name and email' });
        }

        const record = await Record.create({
            name,
            email,
            status: status || 'Active',
            value: value || 0,
            category: category || 'Uncategorized',
            user: req.user._id, // Associate with logged-in user
        });

        res.status(201).json(record);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/data/:id - Update a record
router.put('/:id', protect, async (req, res) => {
    try {
        const { name, email, status, value, category } = req.body;
        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        record.name = name || record.name;
        record.email = email || record.email;
        record.status = status || record.status;
        record.value = value !== undefined ? value : record.value;
        record.category = category || record.category;

        const updatedRecord = await record.save();
        res.json(updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/data/:id - Delete a record
router.delete('/:id', protect, async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        await record.deleteOne();
        res.json({ message: 'Record removed' });
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
