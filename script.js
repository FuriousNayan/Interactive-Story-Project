window.onload = function() {
  document.getElementById('backgroundMusic').play();
}

document.addEventListener('click', function playOnClick() {
  document.getElementById('backgroundMusic').play();
  document.removeEventListener('click', playOnClick);
});

document.getElementById('continue-button').addEventListener('click', function() {
  document.getElementById('story-text').textContent = 
      "Returning to Varesth\nElias arrives at the ruined capital, now infested with Hollowborn, twisted remnants of humanity. A dark presence watches him from the shadows.";
  document.getElementById('story-image').src = "/Images/secondScene.webp";
  
  // Hide the second paragraph
  document.querySelectorAll('p')[1].style.display = 'none';
});
