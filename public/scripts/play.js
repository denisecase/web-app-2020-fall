/**
 * Client-side code for playing a location-based game.
 * @module play
 */

import getLocation from './location.js';

// define event handlers .........................................................

/**
 * Wait to get location and then display it.
 * Location should only be updated in response to a USER GESTURE
 */
async function locationHandler() {
  const locText = await getLocation();
  document.getElementById('locationAnswer').innerHTML = locText;
}

function clearErrorText() {
  document.getElementById('error-message').innerHTML = '';
}

/**
 * Logic to execute each time the new tab loads.
 * Includes a recurring update every n milliseconds.
 */
function main() {
  console.log('Starting play.js main() method.....')

  const startingLat = 40.3506;
  const startingLong = -94.88289;
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: startingLat, lng: startingLong },
      zoom: 8,
    });
  }
  // assign display elements .............................................

  const locationElement = document.getElementById('location');
  const errorElement = document.getElementById('error-message');

  errorElement.innerHTML = '';

  // configure event listeners .............................................

  locationElement.addEventListener('click', locationHandler);
  locationElement.addEventListener('touch', locationHandler);
  errorElement.addEventListener('click', clearErrorText);
  errorElement.addEventListener('touch', clearErrorText);

  /** Possible location error:
   * Geolocation permission has been blocked
   * as the user has ignored the permission prompt several times.
   * This can be reset in Page Info which can be accessed by
   * clicking the lock icon next to the URL.
   * See https://www.chromestatus.com/features/6443143280984064
   * for more information.
   */

  // more startup logic  ...........................................

  const updateDisplay = () => {
    const { clock, nhour } = dateTime.getClock();
    const greeting = dateTime.getGreeting(nhour);
    document.getElementById('clockbox').innerHTML = clock;
    document.getElementById('greeting').innerHTML = greeting;
  };

  const refreshMilliseconds = 10000;
  updateDisplay();
  setInterval(updateDisplay, refreshMilliseconds);
}

window.addEventListener('load', main);
