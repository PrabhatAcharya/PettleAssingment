const calendar = document.querySelector(".calendar");
const monthYear = document.querySelector("#month-year");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const daysContainer = document.querySelector(".days");

let selectedDate = null;

// Get the current date
const currentDate = new Date();

// Event listeners for previous and next buttons
prevBtn.addEventListener("click", showPreviousMonth);
nextBtn.addEventListener("click", showNextMonth);

// Display the calendar
displayCalendar(currentDate);

// Function to display the calendar for a given date
function displayCalendar(date) {
  // Clear previous calendar
  daysContainer.innerHTML = "";

  // Set the month and year in the header
  const month = date.getMonth();
  const year = date.getFullYear();
  monthYear.textContent = `${getMonthName(month)} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(year, month, 1);

  // Determine the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty day placeholders before the first day
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = createDayElement("");
    daysContainer.appendChild(emptyDay);
  }

  // Add day elements for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = createDayElement(day);

    // Add current day class if it matches the current date
    if (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      dayElement.classList.add("current-day");
    }

    daysContainer.appendChild(dayElement);
  }
}

// Function to create a day element
function createDayElement(day) {
  const dayElement = document.createElement("div");
  dayElement.classList.add("day");
  dayElement.textContent = day;
  return dayElement;
}

// Function to get the name of a month based on its index
function getMonthName(monthIndex) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
}

// Function to show the previous month
function showPreviousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  displayCalendar(currentDate);
}

// Function to show the next month
function showNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  displayCalendar(currentDate);
}

// Function to handle date selection
function selectDate(event) {
  const selectedDay = event.target;
  if (!selectedDay.classList.contains("day")) return;

  const selectedDayValue = selectedDay.textContent;
  const selectedMonth = currentDate.getMonth();
  const selectedYear = currentDate.getFullYear();

  if (
    selectedDayValue &&
    selectedMonth >= currentDate.getMonth() &&
    selectedYear >= currentDate.getFullYear()
  ) {
    if (selectedDate) {
      selectedDate.classList.remove("selected");
    }
    selectedDate = selectedDay;
    selectedDate.classList.add("selected");
  }
}

// Event delegation for date selection
daysContainer.addEventListener("click", selectDate);
