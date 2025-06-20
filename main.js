import axios from 'axios';
import _ from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('loadMessage');
  const displayDiv = document.getElementById('display');

  // Add click event listener to the button
  button.addEventListener('click', () => {
    // Make a GET request to the login API endpoint
    axios.get('http://localhost:3000/api/v1/auth/login') // replaced port 5501 with 3002
      .then(response => {
        const data = response.data;

        // Optional: process data with lodash, e.g., shuffle or filter
        const processedData = Array.isArray(data) ? _.shuffle(data) : data;

        // Display the data in the #display div
        displayDiv.innerHTML = '';

        if (typeof processedData === 'object') {
          // If it's an object or array, display JSON
          displayDiv.textContent = JSON.stringify(processedData, null, 2);
        } else {
          // Otherwise, display as text
          displayDiv.textContent = processedData;
        }
      })
      .catch(error => {
        displayDiv.textContent = 'Error fetching data.';
        console.error('Error fetching data:', error);
      });
  });
});