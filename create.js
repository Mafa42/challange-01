const { Sequelize, DataTypes } = require('sequelize');
const { cars } = require('./models');

const sequelize = new Sequelize('carrental_development', 'postgres', 'a', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

const Car = sequelize.define('Car', {
  manufacture: DataTypes.STRING,
  model: DataTypes.STRING,
  image: DataTypes.STRING,
  rentPerDay: DataTypes.INTEGER,
  capacity: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  availableAt: DataTypes.STRING,
  transmission: DataTypes.STRING,
  available: DataTypes.BOOLEAN,
  year: DataTypes.INTEGER,
});

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Tabel Cars berhasil di-migrasi.');
  } catch (err) {
    console.error('Terjadi kesalahan saat migrasi tabel Cars:', err);
  }
}
async function main() {
  await syncDatabase();
  // Tambahkan data-data mobil di bawah ini
  await Car.bulkCreate([
    {
      manufacture: 'Toyota',
      model: 'Avanza',
      image: 'car.02.min.jpg',
      rentPerDay: 300000,
      capacity: 7,
      description: 'Toyota Avanza is a compact MPV.',
      availableAt: '2023-07-20',
      transmission: 'Automatic',
      available: true,
      year: 2022,
    },
    {
      manufacture: 'Honda',
      model: 'Civic',
      image: 'car03.min.jpg',
      rentPerDay: 400000,
      capacity: 5,
      description: 'Honda Civic is a stylish sedan.',
      availableAt: '2023-07-15',
      transmission: 'Automatic',
      available: true,
      year: 2021,
    },
    {
      manufacture: 'BMW',
      model: 'M3',
      image: 'car04.min.jpg',
      rentPerDay: 400000,
      capacity: 5,
      description: 'Honda Civic is a stylish sedan.',
      availableAt: '2023-07-15',
      transmission: 'Automatic',
      available: true,
      year: 2021,
    },
    {
      manufacture: 'Ford',
      model: 'Raptor',
      image: 'car05.min.jpg',
      rentPerDay: 420000,
      capacity: 5,
      description: 'Honda Civic is a stylish sedan.',
      availableAt: '2023-07-15',
      transmission: 'Automatic',
      available: true,
      year: 2021,
    },
    // Tambahkan data-data mobil lainnya di sini
  ]);
}

main();