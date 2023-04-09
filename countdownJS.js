let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slideIndex++;
  
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  
  slides[slideIndex - 1].style.display = "block";
  
  setTimeout(showSlides, 2500); // Change image every 3 seconds
}

const countdownElement = document.getElementById('countdown');

// Check if the target date exists in the localStorage
let targetDate = localStorage.getItem('targetDate');

if (!targetDate) {
  const now = new Date();
  const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
  targetDate = nextWeek.getTime();
  localStorage.setItem('targetDate', targetDate);
} else {
  targetDate = parseInt(targetDate, 10);
}

function createCountdownPart(value, label) {
  const part = document.createElement('div');
  part.classList.add('countdown-part');
  part.innerHTML = `<span class="countdown-value">${value}</span><span class="countdown-label">${label}</span>`;
  return part;
}

const daysElement = createCountdownPart(0, 'Days');
const hoursElement = createCountdownPart(0, 'Hours');
const minutesElement = createCountdownPart(0, 'Minutes');
const secondsElement = createCountdownPart(0, 'Seconds');

countdownElement.appendChild(daysElement);
countdownElement.appendChild(hoursElement);
countdownElement.appendChild(minutesElement);
countdownElement.appendChild(secondsElement);

function updateCountdown() {
  const now = new Date().getTime();
  let remainingTime = targetDate - now;

  if (remainingTime <= 0) {
    // Reset the target date and store it in localStorage
    const now = new Date();
    const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    targetDate = nextWeek.getTime();
    localStorage.setItem('targetDate', targetDate);
    remainingTime = targetDate - now;
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  daysElement.querySelector('.countdown-value').innerText = days;
  hoursElement.querySelector('.countdown-value').innerText = hours;
  minutesElement.querySelector('.countdown-value').innerText = minutes;
  secondsElement.querySelector('.countdown-value').innerText = seconds;
}

updateCountdown(); // Initial display
const countdownInterval = setInterval(updateCountdown, 1000);


function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
