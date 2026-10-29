// booking.js
//
// Handles the "Book a Room" form on booking.html.
// Use rooms.js as your reference for how to fetch data and build
// HTML with template strings.

async function populateRoomSelect() {
  const select = document.getElementById("room-select");

  const rooms = await getRooms();

  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.id;
    option.textContent = `${room.name} (${room.capacity} people)`;
    select.appendChild(option);
  });
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById("form-status");
  statusEl.classList.remove("success", "error");

  const bookingData = {
    roomId: document.getElementById("room-select").value,
    clubName: document.getElementById("club-name").value.trim(),
    date: document.getElementById("date").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    purpose: document.getElementById("purpose").value.trim(),
  };

  try {
    const newBooking = await createBooking(bookingData);
    console.log("Booking created:", newBooking);

    statusEl.textContent = `Booking confirmed for ${bookingData.clubName}!`;
    statusEl.classList.add("success");
    event.target.reset();
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Something went wrong. Please try again.";
    statusEl.classList.add("error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateRoomSelect();
  document
    .getElementById("booking-form")
    .addEventListener("submit", handleBookingSubmit);
});
