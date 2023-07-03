
// Fetch data from fakestore API
function fetchBookings(category = "") {
  let url = "https://fakestoreapi.com/products";

  // Add category filter if provided
  if (category !== "") {
    url += `/category/${category}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      populateBookings(data);
    })
    .catch((error) => console.error(error));
}
fetchBookings();
///filtering data
const listHeading=document.getElementById("bookinglistheading")
const getAllproducts=()=>{
fetchBookings();
listHeading.textContent = "All Bookings";
};
const getAllelectronics=()=>{
fetchBookings("electronics");
listHeading.textContent = "Upcomming Bookings";
};
const getAllwomenclothing=()=>{
 fetchBookings("women's clothing");
 listHeading.textContent = "Checked-In";
}
// Populate bookings list
function populateBookings(data) {
  const bookingsList = document.getElementById("bookings-list");
   document.getElementById("bookings-list").innerHTML="";
  data.slice(page*3-3,page*3).map((item) => {
    const maindiv = document.createElement("div");
    maindiv.setAttribute("id", "main-list-Div");
    const div1 = document.createElement("div");
    div1.setAttribute("id", "list-div1");
    const image = document.createElement("img");
    image.src = item.image;
    const title = document.createElement("h5");
    title.textContent = item.title.substring(0, 13) + "...";
    
  
    //=============DIV2====

    const div2 = document.createElement("div");
    div2.setAttribute("id", "list-div1");
    const beforedate = document.createElement("p");
    beforedate.className = "fa-solid fa-calendar-days";
    beforedate.textContent = getRandomDate();
    beforedate.setAttribute("id","beforedate");
    const arrow = document.createElement("p");
    arrow.className = "fa-solid fa-right-long";
    const afterdate = document.createElement("p");
    afterdate.setAttribute("id","afterdate");
    afterdate.className = "fa-solid fa-calendar-days";
    afterdate.textContent = getRandomDateWithinRange(beforedate.textContent);
    // const status = document.createElement("h4");
    // status.setAttribute("id", "upcomminglable");
    // if (compareDates(beforedate.textContent))
    //  {status.textContent = "Upcomming"}
    //   status.textContent = "";
    div1.append(image, title);
    div2.append(beforedate, arrow, afterdate);

    //=================div3====Progressive bar==

    const div3 = document.createElement("div");
    div3.className = "progress-bar-container";

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    const percentageBefore = document.createElement("div");
    percentageBefore.className = "percentage-before";
    percentageBefore.textContent = getRandomPercentage() + "%";

    const percentageAfter = document.createElement("div");
    percentageAfter.className = "percentage-after";
    percentageAfter.textContent =
      100 - parseInt(percentageBefore.textContent) + "%";
    progressBar.style.width = percentageBefore.textContent;
    div3.append(percentageBefore, progressBar, percentageAfter);

    //=================div4====CheckIn CheckOut======
        const div4 = document.createElement("div");
        div4.className = "CheckInCheckOut-box";
        const checkinCheckbox = document.createElement("input");
        checkinCheckbox.type = "checkbox";
        checkinCheckbox.id = "checkin-checkbox";
 
        const checkinLabel = document.createElement("label");
        checkinLabel.textContent = "Check-In";
        checkinLabel.htmlFor = "checkin-checkbox";

        // Create Checkout checkbox
        const checkoutCheckbox = document.createElement("input");
        checkoutCheckbox.type = "checkbox";
        checkoutCheckbox.id = "checkout-checkbox";

        const checkoutLabel = document.createElement("label");
        checkoutLabel.textContent = "Check-Out";
        checkoutLabel.htmlFor = "checkout-checkbox";

        div4.append(
          checkinCheckbox,
          checkinLabel,
          checkoutCheckbox,
          checkoutLabel
        );
        

determineCheckinCheckout(
  beforedate.textContent,
  afterdate.textContent,
  checkinCheckbox,
  checkoutCheckbox
);
//manupulatin upcomming lable


    maindiv.append(div1, div2, div3,div4);
    bookingsList.append(maindiv);
    
  });
}
let page = 1;
const IncrementPage = () => {
  if (page < 20 / 3) {
    page++;
    fetchBookings();
  }
};

const DecrementPage = () => {
  if (page > 1) {
    page--;
    fetchBookings();
  } else {
    let btn = document.querySelector(".prev-button");
    btn.disabled = true;
  }
};

//GETING DATE FOR CHECK-IN  from today to 15days back
function getRandomDate() {
  var today = new Date(); // Get today's date

  var fifteenDaysAgo = new Date(); // Get a date 15 days ago
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

  var thirtyDaysAhead = new Date(); // Get a date 15 days ahead
  thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 15);

  // Calculate the time difference in milliseconds between 15 days ago and 15 days ahead
  var timeDifference = thirtyDaysAhead.getTime() - fifteenDaysAgo.getTime();

  // Generate a random number within the time difference
  var randomTime = Math.random() * timeDifference;

  // Create a new date using the random time within the range
  var randomDate = new Date(fifteenDaysAgo.getTime() + randomTime);

  // Format the date as "dd/mm/yyyy"
  var formattedDate = randomDate.toLocaleDateString("en-GB");

  return formattedDate;
}

var randomDate = getRandomDate();
console.log(randomDate);
//getting date from today to next 1month
function getRandomDateWithinRange(previousDate) {
  var today = new Date(); // Get today's date

  // Get the maximum date by adding 30 days to the current date
  var maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);

  // Convert the previous date string to a Date object
  var previous = new Date(
    previousDate.split("/")[2],
    previousDate.split("/")[1] - 1,
    previousDate.split("/")[0]
  );

  // Calculate the time difference between the previous date and the maximum date
  var timeDifference = maxDate.getTime() - previous.getTime();

  // Generate a random time within the time difference
  var randomTime = Math.random() * timeDifference;

  // Create a new date using the random time within the range
  var randomDate = new Date(previous.getTime() + randomTime);

  // Check if the random date exceeds the maximum date
  if (randomDate > maxDate) {
    randomDate = maxDate; // Set the random date to the maximum date
  }

  var day = randomDate.getDate().toString().padStart(2, "0"); // Get the day and pad with leading zeros if needed
  var month = (randomDate.getMonth() + 1).toString().padStart(2, "0"); // Get the month (+1 because it's zero-indexed) and pad with leading zeros if needed
  var year = randomDate.getFullYear(); // Get the year

  var formattedDate = day + "/" + month + "/" + year; // Format the date as "dd/mm/yyyy"

  return formattedDate;
}
//progressive bar
function getRandomPercentage() {
  return Math.floor(Math.random() * (100 - 30 + 1)) + 30;
}

//to handle checkbox according to date
// function setCheckinCheckoutStatus(
//   beforeDate,
//   afterDate,
//   checkinCheckbox,
//   checkoutCheckbox
// ) {
//   const currentDate = new Date();

//   const beforeDateObj = new Date(beforeDate);
//   const afterDateObj = new Date(afterDate);
//   console.log("MyDtae",beforeDateObj, afterDateObj)
//   if (beforeDateObj.toDateString() === currentDate.toDateString()) {
//     checkinCheckbox.checked = true;
//   }

//   if (afterDateObj <= currentDate) {
//     checkoutCheckbox.checked = true;
//   }
// }
function determineCheckinCheckout(
  beforeDate,
  afterDate,
  checkinCheckbox,
  checkoutCheckbox
) {
  const currentDate = new Date();

  const [beforeDay, beforeMonth, beforeYear] = beforeDate.split("/");
  const [afterDay, afterMonth, afterYear] = afterDate.split("/");

  const beforeDateObj = new Date(beforeYear, beforeMonth - 1, beforeDay);
  const afterDateObj = new Date(afterYear, afterMonth - 1, afterDay);

  if (beforeDateObj <= currentDate ) {
    checkinCheckbox.checked = true;
  }
  if (beforeDateObj > currentDate) {
    checkinCheckbox.checked = false;
  }

  if (afterDateObj <= currentDate) {
   checkoutCheckbox.checked = true;
  }
  if (afterDateObj > currentDate) {
    checkoutCheckbox.checked = false;
  }
}

function compareDates(dateString) {
  var currentDate = new Date();  // Get the current date

  // Extract day, month, and year components from the provided date string
  var dateComponents = dateString.split('/');
  var day = parseInt(dateComponents[0]);
  var month = parseInt(dateComponents[1]) - 1;  // Months are zero-based in JavaScript
  var year = parseInt(dateComponents[2]);

  // Create a date object for the provided date
  var providedDate = new Date(year, month, day);

  // Compare the dates and return the result
  return currentDate >= providedDate;
}


