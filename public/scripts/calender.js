document.addEventListener('DOMContentLoaded', function() {
    const customDate = document.querySelector('.custom-date');
    const selectedDate = customDate.querySelector('.selected-date');
    const calendar = customDate.querySelector('.calendar');
    const currentMonth = customDate.querySelector('.current-month');
    const prevMonth = customDate.querySelector('.prev-month');
    const nextMonth = customDate.querySelector('.next-month');
    const calendarBody = customDate.querySelector('.calendar-body');
    const selectButton = customDate.querySelector('.select-button');
  
    let selectedDay = null;
    let selectedMonth = null;
    let selectedYear = null;
  
    // Fungsi untuk mendapatkan tanggal awal bulan ini
    function getFirstDayOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
  
    // Fungsi untuk mendapatkan jumlah hari dalam bulan ini
    function getDaysInMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
  
    // Fungsi untuk mengisi kalender dengan tanggal
    function fillCalendar(date) {
      const firstDay = getFirstDayOfMonth(date);
      const daysInMonth = getDaysInMonth(date);
  
      // Menghapus tanggal sebelumnya
      calendarBody.innerHTML = '';
  
      // Menambahkan nama hari dalam 1 huruf (s,m,t,w,t,f,s)
      const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      dayNames.forEach(dayName => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = dayName;
        calendarBody.appendChild(dayElement);
      });
  
      // Mengisi tanggal pada bulan ini
      for (let i = 0; i < firstDay; i++) {
        const emptyElement = document.createElement('div');
        emptyElement.classList.add('date', 'empty');
        calendarBody.appendChild(emptyElement);
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.textContent = i;
        calendarBody.appendChild(dateElement);
  
        dateElement.addEventListener('click', function() {
          selectedDay = i;
          selectedMonth = date.getMonth() + 1;
          selectedYear = date.getFullYear();
          selectButton.removeAttribute('disabled');
          selectButton.textContent = `Pilih Tanggal`;
        });
      }
  
      for (let i = daysInMonth + firstDay; i < 42; i++) {
        const emptyElement = document.createElement('div');
        emptyElement.classList.add('date', 'empty');
        calendarBody.appendChild(emptyElement);
      }
    }
  
    // Menampilkan kalender saat input diklik
    selectedDate.addEventListener('click', function() {
      calendar.style.display = 'block';
    });
  
    // Menyembunyikan kalender saat klik di luar elemen "custom-date"
    document.addEventListener('click', function(event) {
      if (!customDate.contains(event.target)) {
        calendar.style.display = 'none';
      }
    });
  
    // Navigasi bulan sebelumnya
    prevMonth.addEventListener('click', function() {
      const currentDate = new Date(currentMonth.textContent);
      currentDate.setMonth(currentDate.getMonth() - 1);
      currentMonth.textContent = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();
      fillCalendar(currentDate);
    });
  
    // Navigasi bulan selanjutnya
    nextMonth.addEventListener('click', function() {
      const currentDate = new Date(currentMonth.textContent);
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentMonth.textContent = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();
      fillCalendar(currentDate);
    });
  
    // Tombol "Pilih Tanggal" untuk memasukkan tanggal yang dipilih ke dalam input
    selectButton.addEventListener('click', function() {
      if (selectedDay && selectedMonth && selectedYear) {
        if(selectedDay < 10)selectedDay = ('0'+selectedDay)
        if(selectedMonth < 10)selectedMonth = ('0'+selectedMonth)
        selectedDate.value = `${selectedYear}-${selectedMonth}-${selectedDay}`;
        calendar.style.display = 'none';
      }
    });
  
    // Mengisi kalender dengan tanggal bulan ini saat pertama kali dimuat
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    currentMonth.textContent = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();
    fillCalendar(currentDate);
  });
  