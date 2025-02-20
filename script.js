window.onload = function() {
  document.getElementById('backgroundMusic').play();
}

document.addEventListener('click', function playOnClick() {
  document.getElementById('backgroundMusic').play();
  document.removeEventListener('click', playOnClick);
});

document.getElementById('continue-button').addEventListener('click', function() {
  replaceButtonWithTwo(
    "Explore Ruins", "Head Straight to Cathedral",
    { text: "Elias dies from the Hollowborn for being too curious", image: "/Images/eliasDieHollowborn.webp" },
    { text: "The cursed Father Malgath lingers within, speaking in riddles. He tells Elias the Heart of the Hollow Veil lies beyond Ebonwood Forest, but warns that it is not a gift, it is a choice", image: "/Images/eliasRiddle.webp" }
  );

  updateStory(
    "Returning to Varesth\nElias arrives at the ruined capital, now infested with Hollowborn, twisted remnants of humanity. A dark presence watches him from the shadows.",
    "/Images/secondScene.webp"
  );
});

function updateStory(text, imageSrc) {
  document.getElementById('story-text').textContent = text;
  document.getElementById('story-image').src = imageSrc;
}

function replaceButtonWithTwo(button1Text, button2Text, scene1, scene2) {
  const originalButton = document.getElementById('continue-button');

  // Create and configure new buttons
  const createButton = (text, scene) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.addEventListener('click', () => updateStory(scene.text, scene.image));
    return btn;
  };

  originalButton.replaceWith(createButton(button1Text, scene1), createButton(button2Text, scene2));
}
