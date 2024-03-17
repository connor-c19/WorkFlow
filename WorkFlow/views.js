document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#daily').addEventListener('click', () => load_view('daily-view'));
  document.querySelector('#weekly').addEventListener('click', () => load_view('weekly-view'));
  document.querySelector('#monthly').addEventListener('click', () => load_view('monthly-view'));

  // By default, load the daily view
  load_view('daily-view');

});

function load_view(view) {
  // Hide all views
  document.querySelector('#daily-view').style.display = 'none';
  document.querySelector('#weekly-view').style.display = 'none';
  document.querySelector('#monthly-view').style.display = 'none';

  // Display view that is clicked on
  document.querySelector(`#${view}`).style.display = 'block';

  // Load content for specific views
  switch (view) {
    case 'weekly-view':
      displayWeeklyView();
      break;
    case 'daily-view':
      displayDate(new Date());
      break;
    case 'monthly-view':
      displayMonth(new Date());
      break;
    default:
      break;
  }
}

// Load weekly view
function displayWeeklyView() {
  const weeklyView = document.querySelector('#weekly-hours');
  weeklyView.innerHTML = ''; // Clear previous content

  generateHours('weekly');
  displayWeek(new Date());
}

// Display current date for weekly view
function displayWeek(date) {
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // End on Saturday
  document.getElementById("current-date").innerText = startDate.toDateString() + ' - ' + endDate.toDateString();
}

// Display current date for daily view
function displayDate(date) {
  document.getElementById("current-date").innerText = date.toDateString();
  generateHoursForDay(date);
}

// Function to generate hourly slots for a specific day
function generateHoursForDay(date) {
  const hoursContainer = document.querySelector('#daily-view');
  hoursContainer.innerHTML = '';

  // Loop through the hours of the day
  for (let i = 0; i < 24; i++) {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour-daily');
    hourDiv.innerHTML = `<span>${i % 12 === 0 ? 12 : i % 12}:00 ${i < 12 ? 'a.m.' : 'p.m.'}</span>`;
    hoursContainer.appendChild(hourDiv);
  }
}

// Function to generate hourly slots
function generateHours(view) {
  var hoursContainer;
  if (view === 'weekly'){
    hoursContainer = document.querySelector('#weekly-hours');
  }
  else{
    hoursContainer = document.querySelector(`#${view}-view`);
  }
  hoursContainer.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add(`hour-${view}`);
    hourDiv.innerHTML = `<span>${i % 12 === 0 ? 12 : i % 12}:00 ${i < 12 ? 'a.m.' : 'p.m.'}</span>`;
    hoursContainer.appendChild(hourDiv);
  }
}

// Function to display monthly view
function displayMonth(date) {
  const monthlyGrid = document.getElementById('monthly-grid');
  monthlyGrid.innerHTML = ''; // Clear previous content

  const year = date.getFullYear();
  const month = date.getMonth();

  // Set current date to the first day of the month
  const currentDate = new Date(year, month, 1);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = currentDate.getDay();

  // Create a row for the days of the week
  const daysOfWeekRow = document.createElement('tr');
  for (let i = 0; i < 7; i++) {
    const dayOfWeekCell = document.createElement('th');
    dayOfWeekCell.textContent = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
    daysOfWeekRow.appendChild(dayOfWeekCell);
  }
  monthlyGrid.appendChild(daysOfWeekRow);

  // Create a row for the first week of the month
  let currentDay = 1;
  const firstWeekRow = document.createElement('tr');
  for (let i = 0; i < 7; i++) {
    const dayCell = document.createElement('td');
    if (i >= firstDayOfMonth) {
      dayCell.textContent = currentDay;
      currentDay++;
    }
    firstWeekRow.appendChild(dayCell);
  }
  monthlyGrid.appendChild(firstWeekRow);

  // Create table rows for the remaining weeks of the month
  let remainingDays = daysInMonth - currentDay + 1;
  while (remainingDays > 0) {
    const weekRow = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
      const dayCell = document.createElement('td');
      if (remainingDays > 0) {
        dayCell.textContent = currentDay;
        currentDay++;
        remainingDays--;
      }
      weekRow.appendChild(dayCell);
    }
    monthlyGrid.appendChild(weekRow);
  }

  // Update current date display
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  document.getElementById("current-date").innerText = `${monthName} ${year}`;
}

// Event listener for previous date button
document.getElementById('prev').addEventListener('click', function() {
  if (document.querySelector('#monthly-view').style.display === 'block') {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setMonth(currentDate.getMonth() - 1); // Subtract 1 month for previous month
    displayMonth(currentDate);

  } else if (document.querySelector('#weekly-view').style.display === 'block') {
    const currentDate = new Date(document.getElementById("current-date").innerText.split(' - ')[0]);
    currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days for previous week
    displayWeek(currentDate);

  } else if (document.querySelector('#daily-view').style.display === 'block') {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setDate(currentDate.getDate() - 1);
    displayDate(currentDate);
  }
});

// Event listener for next date button
document.getElementById('next').addEventListener('click', function() {
  if (document.querySelector('#monthly-view').style.display === 'block') {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setMonth(currentDate.getMonth() + 1); // Add 1 month for next month
    displayMonth(currentDate);

  } else if (document.querySelector('#weekly-view').style.display === 'block') {
    const currentDate = new Date(document.getElementById("current-date").innerText.split(' - ')[0]);
    currentDate.setDate(currentDate.getDate() + 7); // Add 7 days for next week
    displayWeek(currentDate);

  } else if (document.querySelector('#daily-view').style.display === 'block') {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setDate(currentDate.getDate() + 1);
    displayDate(currentDate);
  }
});
