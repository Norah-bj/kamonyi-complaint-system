require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB Connected');

        const existingAdmin = await User.findOne({ email: 'admin@kamonyi.gov.rw' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = new User({
            name: 'Kamonyi Admin',
            email: 'admin@kamonyi.gov.rw',
            password: 'password123',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user seeded successfully. Email: admin@kamonyi.gov.rw, Password: password123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
