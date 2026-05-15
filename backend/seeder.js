const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Turf = require('./src/models/Turf');
const Booking = require('./src/models/Booking');
const { USER_ROLES, TURF_STATUS, BOOKING_STATUS } = require('./src/utils/constants');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const areas = ['Uttara', 'Mirpur', 'Banani', 'Dhanmondi', 'Gulshan', 'Bashundhara', 'Mohammadpur', 'Badda'];
const sports = [['Football'], ['Cricket'], ['Football', 'Cricket']];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Turf.deleteMany();
    await Booking.deleteMany();

    // Create SuperAdmin
    await User.create({
      name: 'Super Admin',
      email: 'admin@ledgerturf.com',
      password: 'password123',
      phone: '01700000000',
      role: USER_ROLES.SUPER_ADMIN,
    });

    // Create 5 Owners
    const owners = [];
    for (let i = 1; i <= 5; i++) {
      const owner = await User.create({
        name: `Owner ${i}`,
        email: `owner${i}@gmail.com`,
        password: 'password123',
        phone: `0180000000${i}`,
        role: USER_ROLES.TURF_OWNER,
      });
      owners.push(owner);
    }

    // Create 15 Turfs
    const turfs = [];
    for (let i = 1; i <= 15; i++) {
      const area = areas[i % areas.length];
      const sport = sports[i % sports.length];
      const turf = await Turf.create({
        owner: owners[i % owners.length]._id,
        name: `${area} ${sport[0]} ${i > 8 ? 'Arena' : 'Club'}`,
        description: `Premium ${sport.join(' and ')} facility in ${area}. Top-notch grass and lightning.`,
        address: `${area} Road ${i}, Dhaka`,
        location: {
          type: 'Point',
          coordinates: [90.35 + Math.random() * 0.1, 23.7 + Math.random() * 0.2],
          city: 'Dhaka',
          area: area,
        },
        sportTypes: sport,
        pricePerHour: 1200 + (Math.floor(Math.random() * 10) * 100),
        status: i % 5 === 0 ? TURF_STATUS.PENDING : TURF_STATUS.APPROVED,
        isIndoor: i % 3 === 0,
        averageRating: 4 + Math.random(),
        openingTime: '06:00',
        closingTime: '23:00',
        images: [`https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800&id=${i}`]
      });
      turfs.push(turf);
    }

    // Create a Test Player
    const player = await User.create({
      name: 'Test Player',
      email: 'player@gmail.com',
      password: 'password123',
      phone: '01900000000',
      role: USER_ROLES.PLAYER,
    });

    for (let i = 0; i < 5; i++) {
      await Booking.create({
        user: player._id,
        turf: turfs[i]._id,
        date: new Date(),
        startTime: '18:00',
        endTime: '19:00',
        totalPrice: turfs[i].pricePerHour,
        status: BOOKING_STATUS.CONFIRMED,
        paymentStatus: 'paid',
      });
    }

    console.log('Seeded 1 Admin, 5 Owners, 15 Turfs (with images & roles), and 1 Player with bookings.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
