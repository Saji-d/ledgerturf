const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Turf = require('./src/models/Turf');
const { USER_ROLES, TURF_STATUS } = require('./src/utils/constants');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Turf.deleteMany();

    // Create SuperAdmin
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@ledgerturf.com',
      password: 'password123',
      role: USER_ROLES.SUPER_ADMIN,
    });

    // Create Turf Owners
    const owner1 = await User.create({
      name: 'Uttara Turf Owner',
      email: 'owner1@gmail.com',
      password: 'password123',
      role: USER_ROLES.TURF_OWNER,
    });

    const owner2 = await User.create({
      name: 'Banani Turf Owner',
      email: 'owner2@gmail.com',
      password: 'password123',
      role: USER_ROLES.TURF_OWNER,
    });

    // Create Turfs
    await Turf.create([
      {
        owner: owner1._id,
        name: 'Uttara Football Arena',
        description: 'Premium artificial grass turf in the heart of Uttara.',
        address: 'Sector 4, Uttara, Dhaka',
        location: {
          type: 'Point',
          coordinates: [90.3994, 23.8759], // [lng, lat]
          city: 'Dhaka',
          area: 'Uttara',
        },
        sportTypes: ['Football'],
        pricePerHour: 2000,
        status: TURF_STATUS.APPROVED,
        isIndoor: false,
      },
      {
        owner: owner2._id,
        name: 'Banani Cricket Ground',
        description: 'Top quality indoor cricket facility.',
        address: 'Road 11, Banani, Dhaka',
        location: {
          type: 'Point',
          coordinates: [90.4071, 23.7937],
          city: 'Dhaka',
          area: 'Banani',
        },
        sportTypes: ['Cricket'],
        pricePerHour: 1500,
        status: TURF_STATUS.APPROVED,
        isIndoor: true,
      },
      {
        owner: owner1._id,
        name: 'Mirpur Sports Complex',
        description: 'Multi-sport turf for football and cricket.',
        address: 'Mirpur 2, Dhaka',
        location: {
          type: 'Point',
          coordinates: [90.3623, 23.8069],
          city: 'Dhaka',
          area: 'Mirpur',
        },
        sportTypes: ['Football', 'Cricket'],
        pricePerHour: 1800,
        status: TURF_STATUS.PENDING,
        isIndoor: false,
      },
    ]);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
