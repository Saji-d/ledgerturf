const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Turf = require('./src/models/Turf');
const Booking = require('./src/models/Booking');
const Review = require('./src/models/Review');
const { USER_ROLES, TURF_STATUS, BOOKING_STATUS } = require('./src/utils/constants');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const turfsData = [
  // Uttara
  {
    name: 'Uttara Arena Football Club',
    area: 'Uttara',
    coords: [90.3950, 23.8759],
    sports: ['Football'],
    price: 2500,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800',
    desc: 'Floodlight equipped premium football turf in Uttara Sector 1. Best for night matches.'
  },
  {
    name: 'Sector 4 Indoor Cricket Hub',
    area: 'Uttara',
    coords: [90.3990, 23.8680],
    sports: ['Cricket'],
    price: 3500,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1531415080293-2f768a3d59cd?auto=format&fit=crop&q=80&w=800',
    desc: 'Professional indoor cricket facility with bowling machines and expert coaching.'
  },
  {
    name: 'Uttara High Noon Multi-Sport',
    area: 'Uttara',
    coords: [90.3900, 23.8720],
    sports: ['Football', 'Cricket'],
    price: 3000,
    rating: 4.2,
    img: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
    desc: 'High-quality multi-purpose turf suitable for both football and cricket enthusiasts.'
  },
  // Mirpur
  {
    name: 'Mirpur DOHS Sports City',
    area: 'Mirpur',
    coords: [90.3620, 23.8340],
    sports: ['Football'],
    price: 2200,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    desc: 'Located in the secure DOHS area, offering top-tier artificial grass for 7-a-side matches.'
  },
  {
    name: 'Elite Cricket Academy Mirpur',
    area: 'Mirpur',
    coords: [90.3650, 23.8100],
    sports: ['Cricket'],
    price: 4000,
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800',
    desc: 'Premium cricket academy and turf with floodlights and international standard pitches.'
  },
  {
    name: 'Mirpur Stadium Rooftop Turf',
    area: 'Mirpur',
    coords: [90.3600, 23.8050],
    sports: ['Football'],
    price: 2800,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&q=80&w=800',
    desc: 'Unique rooftop experience with a view of the national stadium. Perfect for social games.'
  },
  // Dhanmondi
  {
    name: 'Dhanmondi Club Turf',
    area: 'Dhanmondi',
    coords: [90.3770, 23.7460],
    sports: ['Football'],
    price: 3200,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800',
    desc: 'Iconic Dhanmondi club turf with a rich history and well-maintained grass surface.'
  },
  {
    name: 'Abahani Field Premium Cricket',
    area: 'Dhanmondi',
    coords: [90.3700, 23.7500],
    sports: ['Cricket'],
    price: 4500,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=800',
    desc: 'Top-of-the-line cricket turf in Dhanmondi. Home to some of the best matches in the city.'
  },
  // Gulshan
  {
    name: 'Gulshan Youth Club Grounds',
    area: 'Gulshan',
    coords: [90.4150, 23.7920],
    sports: ['Football', 'Cricket'],
    price: 4000,
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1518605336324-4829759e663e?auto=format&fit=crop&q=80&w=800',
    desc: 'Premium multi-sport facility in Gulshan 2. Highly sought after for its prime location.'
  },
  {
    name: 'Niketon Sport Zone',
    area: 'Gulshan',
    coords: [90.4100, 23.7800],
    sports: ['Football'],
    price: 3500,
    rating: 4.4,
    img: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&q=80&w=800',
    desc: 'Modern football turf in Niketon. Excellent floodlighting for night-time matches.'
  },
  // Banani
  {
    name: 'Banani Field 11',
    area: 'Banani',
    coords: [90.4050, 23.7940],
    sports: ['Football'],
    price: 3800,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800',
    desc: 'Premium artificial grass turf in Banani 11. Known for its perfect surface and lighting.'
  },
  {
    name: 'Chairman Bari Indoor Cricket Center',
    area: 'Banani',
    coords: [90.4000, 23.7880],
    sports: ['Cricket'],
    price: 4200,
    rating: 4.3,
    img: 'https://images.unsplash.com/photo-1606913084603-3e75a3399432?auto=format&fit=crop&q=80&w=800',
    desc: 'Premier indoor cricket center with high-performance nets and bowling machines.'
  },
  // Bashundhara
  {
    name: 'Bashundhara Kings Sports Complex',
    area: 'Bashundhara',
    coords: [90.4550, 23.8180],
    sports: ['Football', 'Cricket'],
    price: 5000,
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    desc: 'State-of-the-art sports complex in Bashundhara. The most premium turf in Bangladesh.'
  },
  {
    name: 'P Block Mini Football Turf',
    area: 'Bashundhara',
    coords: [90.4600, 23.8250],
    sports: ['Football'],
    price: 2000,
    rating: 4.1,
    img: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&q=80&w=800',
    desc: 'Affordable mini-turf in Bashundhara P block. Great for kids and casual 5-a-side matches.'
  },
  // Badda
  {
    name: 'Badda Al-Amin Sports Club',
    area: 'Badda',
    coords: [90.4280, 23.7850],
    sports: ['Football'],
    price: 1800,
    rating: 4.2,
    img: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800',
    desc: 'Friendly community sports club with a solid football turf and local vibes.'
  },
  {
    name: 'Satarkul Cricket Hub',
    area: 'Badda',
    coords: [90.4350, 23.7900],
    sports: ['Cricket'],
    price: 2500,
    rating: 4.4,
    img: 'https://images.unsplash.com/photo-1589801258277-50e42706a298?auto=format&fit=crop&q=80&w=800',
    desc: 'Dedicated cricket hub in Satarkul with multiple practice nets and a main turf.'
  },
  // Khilkhet
  {
    name: 'Khilkhet United Grounds',
    area: 'Khilkhet',
    coords: [90.4200, 23.8300],
    sports: ['Football'],
    price: 1900,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=800',
    desc: 'Well-maintained football grounds in Khilkhet, offering good value for money.'
  },
  {
    name: 'Nikunja Rooftop Sports',
    area: 'Khilkhet',
    coords: [90.4250, 23.8350],
    sports: ['Football'],
    price: 2400,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
    desc: 'A trendy rooftop turf in Nikunja with a cool breeze and great city view.'
  },
  // Mohammadpur
  {
    name: 'Mohammadpur Physical Arena',
    area: 'Mohammadpur',
    coords: [90.3580, 23.7550],
    sports: ['Football'],
    price: 2100,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1524015324113-ad97d9937265?auto=format&fit=crop&q=80&w=800',
    desc: 'Large football arena in Mohammadpur with high-quality artificial grass.'
  },
  {
    name: 'Asad Gate Sports Zone',
    area: 'Mohammadpur',
    coords: [90.3650, 23.7600],
    sports: ['Cricket'],
    price: 2800,
    rating: 4.4,
    img: 'https://images.unsplash.com/photo-1587385789097-724d207ec224?auto=format&fit=crop&q=80&w=800',
    desc: 'Conveniently located sports zone near Asad Gate with a solid cricket turf.'
  },
  // Rampura
  {
    name: 'Rampura Banasree Block F Turf',
    area: 'Rampura',
    coords: [90.4350, 23.7650],
    sports: ['Football'],
    price: 1850,
    rating: 4.1,
    img: 'https://images.unsplash.com/photo-1563820250230-019912768565?auto=format&fit=crop&q=80&w=800',
    desc: 'A popular football turf in Banasree, known for its friendly environment.'
  },
  {
    name: 'Aftabnagar Grand Arena',
    area: 'Rampura',
    coords: [90.4400, 23.7700],
    sports: ['Football', 'Cricket'],
    price: 3200,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800',
    desc: 'Spacious and well-lit arena in Aftabnagar for both football and cricket.'
  }
];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Turf.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    // Create SuperAdmin
    await User.create({
      name: 'Super Admin',
      email: 'admin@ledgerturf.com',
      password: 'password123',
      phone: '01711111111',
      role: USER_ROLES.SUPER_ADMIN,
    });

    // Create 3 Owners
    const owners = [];
    const ownerNames = ['Rahat Ahmed', 'Salim Khan', 'Nafis Iqbal'];
    for (let i = 0; i < 3; i++) {
      const owner = await User.create({
        name: ownerNames[i],
        email: `owner${i+1}@gmail.com`,
        password: 'password123',
        phone: `0180000000${i+1}`,
        role: USER_ROLES.TURF_OWNER,
      });
      owners.push(owner);
    }

    // Create Turfs
    const turfs = [];
    for (let i = 0; i < turfsData.length; i++) {
      const d = turfsData[i];
      const turf = await Turf.create({
        owner: owners[i % owners.length]._id,
        name: d.name,
        description: d.desc || `Premium ${d.sports.join(' and ')} facility located in the heart of ${d.area}. We provide high-quality grass, excellent lighting for night matches, and clean changing rooms. Perfect for corporate matches and friendly games.`,
        address: `${d.area}, Dhaka, Bangladesh`,
        location: {
          type: 'Point',
          coordinates: d.coords,
          city: 'Dhaka',
          area: d.area,
        },
        sportTypes: d.sports,
        pricePerHour: d.price,
        status: TURF_STATUS.APPROVED,
        isIndoor: d.name.toLowerCase().includes('indoor') || Math.random() > 0.8,
        averageRating: d.rating,
        openingTime: '06:00',
        closingTime: '23:00',
        images: [d.img]
      });
      turfs.push(turf);

      // Add a dummy review to make the rating realistic
      await Review.create({
        user: (await User.findOne({role: USER_ROLES.SUPER_ADMIN}))._id,
        turf: turf._id,
        rating: Math.floor(d.rating),
        comment: 'Excellent facility and well maintained field.'
      });
    }

    // Create a Test Player
    const player = await User.create({
      name: 'Tamim Iqbal',
      email: 'player@gmail.com',
      password: 'password123',
      phone: '01900000000',
      role: USER_ROLES.PLAYER,
    });

    console.log(`Database seeded with 1 Admin, 3 Owners, ${turfs.length} Turfs, and 1 Player.`);
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
