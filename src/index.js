import './style.css'

const img = document.querySelector('img');
const buttonFetch = document.querySelector('button');
const gifName = document.querySelector('input');

buttonFetch.addEventListener('click', () => {
  let search = gifName.value;
  fetchGif(search);
});

function fetchGif(search) {
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=LwQfFbJnHPLkNdANhixn9gQ0xhzQpsaG&s=${search}`, {mode: 'cors'})
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(function(response) {
      if (response.data.length === 0) {
        displayErrorMessage('No GIFs found for this search term.');
      } else {
        img.src = response.data.images.original.url;
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      displayErrorMessage('An error occurred while fetching the GIF.');
    });
}

function displayErrorMessage(message) {
  // Assuming the img element is inside a container
  const container = img.parentElement;
  container.innerHTML = `<p class="error">${message}</p>`;
}