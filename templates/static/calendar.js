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

  //display view that it clicked on
  document.querySelector(`#${view}`).style.display = 'block';

  // Load content for weekly view
  if (view === 'weekly-view') {
    displayWeeklyView();
  }
  else if (view === 'daily-view')
  {
    const currentDate = new Date();
    displayDate(currentDate);
  }
}


function displayWeeklyView() {
  const weeklyView = document.querySelector('#weekly-hours');
  weeklyView.innerHTML = ''; // Clear previous content

  generateHours('weekly');

  const currentDate = new Date(document.getElementById("current-date").innerText);
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDate.getDay()); // Set to first day of the week

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const date = new Date();
  displayWeek(date);
}



// Function to display current week
function displayWeek(date) {
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // End on Saturday
  document.getElementById("current-date").innerText = startDate.toDateString() + ' - ' + endDate.toDateString();
}

// Function to display current date
function displayDate(date) {
  document.getElementById("current-date").innerText = date.toDateString();
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
  //hoursContainer.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add(`hour-${view}`);
    hourDiv.innerHTML = `<span>${i}:00</span>`;
    hoursContainer.appendChild(hourDiv);
  }
}

// Event listener for previous day button
document.getElementById('prev').addEventListener('click', function() {

  if (document.querySelector('#weekly-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText.split(' - ')[0]);
    currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days for previous week
    displayWeek(currentDate);
  }
  else if (document.querySelector('#daily-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setDate(currentDate.getDate() - 1);
    displayDate(currentDate);
  }
  
});

// Event listener for next day button
document.getElementById('next').addEventListener('click', function() {
  if (document.querySelector('#weekly-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText.split(' - ')[0]);
    currentDate.setDate(currentDate.getDate() + 7); // Add 7 days for next week
    displayWeek(currentDate);
  }
  else if (document.querySelector('#daily-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setDate(currentDate.getDate() + 1);
    displayDate(currentDate);
  }

});

// On page load
const currentDate = new Date();
displayDate(currentDate);
generateHours("daily");