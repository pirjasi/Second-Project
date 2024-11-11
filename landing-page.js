document.addEventListener("DOMContentLoaded", function () {
    const artistSelect = document.getElementById("artistSelect");
    const itemsContainer = document.getElementById("items-container");
    const artistCard = document.getElementById("artistCard");
    const visitorCard = document.getElementById("visitorCard");
  
    // Fetch artist names from the endpoint and populate the dropdown
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        users.forEach((user) => {
          const option = document.createElement("option");
          option.value = user.name;
          option.textContent = user.name;
          artistSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching artist data:", error));
  
    // Sample items for filtering
    const items = [
      { title: "Item 1", artist: "Leanne Graham", description: "Description 1" },
      { title: "Item 2", artist: "Ervin Howell", description: "Description 2" },
      { title: "Item 3", artist: "Clementine Bauch", description: "Description 3" },
      
    ];
  
    // Handle artist selection and filter items based on selected artist
    artistSelect.addEventListener("change", function (event) {
      const selectedArtist = event.target.value;
      if (selectedArtist) {
        filterItemsByArtist(selectedArtist);
      }
    });
  
    // Function to filter items by artist
    function filterItemsByArtist(artistName) {
      const filteredItems = items.filter((item) => item.artist === artistName);
      renderItems(filteredItems);
    }
  
    // Function to render items in the DOM
    function renderItems(items) {
      itemsContainer.innerHTML = ""; 
  
      items.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        itemCard.innerHTML = `
          <h3>${item.title}</h3>
          <p>Artist: ${item.artist}</p>
          <p>${item.description}</p>
        `;
        itemsContainer.appendChild(itemCard);
      });
    }
  
    // Prevent the artist card from redirecting immediately on dropdown interaction
    artistSelect.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  
    // Handle redirection on card click based on selected artist or visitor
    artistCard.addEventListener("click", function () {
      const selectedArtist = artistSelect.value;
      if (selectedArtist) {
        alert(`Redirecting to ${selectedArtist}'s homepage`);
        window.location.href = "artist-homepage.html"; // Redirect when artist is selected
      } else {
        alert("Please choose an artist first.");
      }
    });
  
    visitorCard.addEventListener("click", function () {
      alert("Redirecting to Visitor homepage.");
      window.location.href = "visitor-homepage.html";
    });
  
    // Animate card selection with smooth transitions
    function chooseCard(cardType) {
      artistCard.classList.remove("move-to-right", "move-to-left");
      visitorCard.classList.remove("move-to-right", "move-to-left");
  
      if (cardType === "artist") {
        artistCard.classList.add("move-to-right");
        visitorCard.classList.add("move-to-left");
      } else if (cardType === "visitor") {
        artistCard.classList.add("move-to-left");
        visitorCard.classList.add("move-to-right");
      }
  
      setTimeout(() => {
        if (cardType === "artist") {
          alert("Redirecting to Artist login...");
        } else if (cardType === "visitor") {
          alert("Redirecting to Visitor login...");
        }
      }, 600);
    }
  
    // Smooth scrolling to main section on page load
    window.onload = function () {
      const target = document.querySelector("main");
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    };
  });
  