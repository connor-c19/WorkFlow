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
    displayDate(new Date());
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
  generateHours("daily");
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
  //hoursContainer.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add(`hour-${view}`);
    hourDiv.innerHTML = `<span>${i}:00</span>`;
    hoursContainer.appendChild(hourDiv);
  }
}

// Event listener for previous date button
document.getElementById('prev').addEventListener('click', function() {
  //if current page is weekly view
  if (document.querySelector('#weekly-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText.split(' - ')[0]);
    currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days for previous week
    displayWeek(currentDate);
  }
  //else if current page is daily view
  else if (document.querySelector('#daily-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setDate(currentDate.getDate() - 1);
    displayDate(currentDate);
  }
  
});

// Event listener for next date button
document.getElementById('next').addEventListener('click', function() {
  //if current page is weekly view
  if (document.querySelector('#weekly-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText.split(' - ')[0]);
    currentDate.setDate(currentDate.getDate() + 7); // Add 7 days for next week
    displayWeek(currentDate);
  }
  //else if current page is daily view
  else if (document.querySelector('#daily-view').style.display === 'block')
  {
    const currentDate = new Date(document.getElementById("current-date").innerText);
    currentDate.setDate(currentDate.getDate() + 1);
    displayDate(currentDate);
  }

});