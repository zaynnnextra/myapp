// my-bookings.js
//
// Renders the list of bookings on my-bookings.html and lets the
// user cancel a booking. Use rooms.js as your reference.

async function renderBookings() {
  const container = document.getElementById("bookings-list");

  const bookings = await getBookings();

  if (!bookings || bookings.length === 0) {
    container.innerHTML = "<p>No bookings yet. Go book a room!</p>";
    return;
  }

  const rooms = await getRooms();
  container.innerHTML = bookings
    .map((booking) => bookingToHtml(booking, rooms))
    .join("");

  container.querySelectorAll(".cancel-btn").forEach((button) => {
    button.addEventListener("click", () => {
      handleCancelClick(button.dataset.id);
    });
  });
}

function bookingToHtml(booking, rooms) {
  const room = rooms.find((r) => r.id === booking.roomId);
  const roomName = room ? room.name : booking.roomId;

  return `
    <div class="booking-item">
      <div>
        <h3>${roomName}</h3>
        <p><strong>Club:</strong> ${booking.clubName}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
        <p><strong>Purpose:</strong> ${booking.purpose || "N/A"}</p>
      </div>
      <button class="cancel-btn" data-id="${booking.id}">Cancel</button>
    </div>
  `;
}

async function handleCancelClick(bookingId) {
  await deleteBooking(bookingId);
  renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);
