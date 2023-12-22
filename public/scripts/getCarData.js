const carListElement = document.getElementById('result');
const AdminCarlistElement = document.getElementById('result-admin');
const filterCapacityElement = document.getElementById('filterCapacity');
const filterAvailableElement = document.getElementById('driver');
const filterButton = document.getElementById('filter');
const filterDateElement = document.getElementById('filterDate');
const filterTimeElement = document.getElementById('filterTime');

let carsData = []; // Variabel untuk menyimpan seluruh data mobil

// Fetch data dari cars.json
fetch('/cars.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
    }
  })
  .then(data => {
    console.log(data);
    carsData = data;
    showCars(carsData);
    filterButton.addEventListener('click', handleFilter);
  })
  .catch(error => {
    console.error('Error loading data:', error.message);
    // Handle the error, you might want to display a user-friendly message on the webpage.
  });



function showCars(cars) {
  carListElement.innerHTML = ''; // Hapus konten carListElement sebelum menampilkan mobil

  // Loop melalui setiap mobil dalam data
  cars.forEach(car => {
    const carDiv = document.createElement('div');
    carDiv.classList.add('car'); // Tambahkan kelas 'car' ke elemen div
    const imagePath = "./images/" + car.image.replace(/ /g);

    carDiv.innerHTML = `
      <img src="./${car.image}" alt="" class="car-image"><!-- Perubahan di sini -->
      <p class="car-name">${car.manufacture} ${car.model}</p>
      <h3>Rp ${car.rentPerDay}/hari</h3>
      <p class="car-description">${car.description}</p>
      <img src="icons/fi_users.png" class="car-icons" alt="" srcset=""> ${car.capacity} Orang <br>
      <img src="icons/fi_settings.png" class="car-icons" alt="" srcset=""> ${car.transmission} <br>
      <img src="icons/fi_calendar.png" class="car-icons" alt="" srcset=""> Tahun ${car.year} <br>
      <button class="button-green">Pilih Mobil</button>
    `;

    carListElement.appendChild(carDiv);
  });
}

function handleFilter() {
  const selectedCapacity = filterCapacityElement.value;
  const selectedAvailable = filterAvailableElement.value;
  const selectedDate = filterDateElement.value;
  const selectedTime = filterTimeElement.value;
  let filteredCars = carsData.filter(car => {

    // Filter berdasarkan jumlah penumpang
    if (selectedCapacity !== '' && car.capacity < parseInt(selectedCapacity)) {
      return false;
    }
    if (selectedDate !== '' && selectedTime !== '') {
      const selectedDateTime = new Date(selectedDate + 'T' + selectedTime + ':00.000Z').getTime();
      const carAvailableDateTime = new Date(car.availableAt).getTime();
      if (selectedDateTime < carAvailableDateTime) {
        return false;
      }
    } else if (selectedDate !== '' && selectedTime === '') {
      const selectedDateTime = new Date(selectedDate + 'T00:00:00.000Z').getTime();
      const carAvailableDateTime = new Date(car.availableAt).getTime();
      if (selectedDateTime < carAvailableDateTime) {
        return false;
      }
    }
    // Filter berdasarkan ketersediaan
    if (selectedAvailable !== '' && car.available !== (selectedAvailable === 'Dengan Supir')) {
      return false;
    }
    return true;
  });

  showCars(filteredCars);
}
