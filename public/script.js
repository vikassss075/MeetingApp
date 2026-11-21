axios.defaults.baseURL = 'http://localhost:3000';

const slotsContainer = document.getElementById('slots-container');
const bookingBox = document.getElementById('booking-box');
const bookingForm = document.getElementById('booking-form');
const confirmationBox = document.getElementById('confirmation-box');
const confirmationText = document.getElementById('confirmation-text');
const meetingsContainer = document.getElementById('meetings-container');

let selectedSlotId = null;

async function loadSlots() {
  try {
    const res = await axios.get('/slots');
    slotsContainer.innerHTML = '';

    res.data.forEach(slot => {
      const div = document.createElement('div');
      div.className = 'slot-card';

      if (slot.availableSlots === 0) {
        div.classList.add('disabled');
      }

      div.innerHTML = `
        <div class="slot-time">${slot.time}</div>
        <div class="slot-available">${slot.availableSlots} Available</div>
      `;

      div.addEventListener('click', () => {
        if (slot.availableSlots > 0) {
          selectedSlotId = slot.id;
          confirmationBox.classList.add('hidden');
          bookingBox.classList.remove('hidden');
        }
      });

      slotsContainer.appendChild(div);
    });
  } catch (err) {
    console.log(err);
  }
}

async function loadMeetings() {
  try {
    const res = await axios.get('/meetings');
    meetingsContainer.innerHTML = '';

    res.data.forEach(meeting => {
      const card = document.createElement('div');
      card.className = 'meeting-card';

      card.innerHTML = `
        <h3>Hi ${meeting.name},</h3>
        <p>Please join the meeting via this <a href="${meeting.Slot.meetingLink}" target="_blank">${meeting.Slot.meetingLink}</a> at ${meeting.Slot.time}.</p>
        <button class="btn-blue" onclick="cancelMeeting(${meeting.id})">Cancel</button>
      `;

      meetingsContainer.appendChild(card);
    });
  } catch (err) {
    console.log(err);
  }
}

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  try {
    const res = await axios.post('/meetings', {
      name,
      email,
      slotId: selectedSlotId
    });

    const data = res.data;

    bookingForm.reset();
    bookingBox.classList.add('hidden');

    confirmationText.innerHTML = `Slot confirmed ${data.name}. Please join at ${data.time} Via <a href="${data.meetingLink}" target="_blank">${data.meetingLink}</a> Link`;
    confirmationBox.classList.remove('hidden');

    loadSlots();
    loadMeetings();
  } catch (err) {
    console.log(err);
  }
});

async function cancelMeeting(id) {
  try {
    await axios.delete(`/meetings/${id}`);
    confirmationBox.classList.add('hidden');
    loadSlots();
    loadMeetings();
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadSlots();
  loadMeetings();
});
