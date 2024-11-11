document.getElementById('filter-button').addEventListener('click', function() {
    document.getElementById('filter-panel').classList.add('open');
});

// Close the filter panel
document.getElementById('close-filter').addEventListener('click', function() {
    document.getElementById('filter-panel').classList.remove('open');
});

const itemsArray = [
    { title: 'Memories of a Geisha', artistName: 'Patricia Lebsack', price: 999, imageUrl: 'gallery/image a14.jpg' },
    { title: 'Cherry Blossom', artistName: 'Kurtis Weisnnat', price: 666, imageUrl: 'gallery/image a15.jpeg' },
    { title: 'Genocide', artistName: 'Laenne Graham', price: 505, imageUrl: 'gallery/image a11.jpg' },
    { title: 'Abstract', artistName: 'Erwin Howell', price: 601, imageUrl: 'gallery/image a8.jpg' },
    { title: 'Sister\'s Love', artistName: 'Clementine Bauch', price: 1000, imageUrl: 'gallery/image a12.jpg' },
    { title: 'Musican', artistName: 'Chelsey Dietrich', price: 830, imageUrl: 'gallery/image a6.jpg' },
    { title: 'Women', artistName: 'Glenna Reichert', price: 940, imageUrl: 'gallery/image a5.jpg' },
    { title: 'Pop Art', artistName: 'Nicholas Runolfsdottir V', price: 550, imageUrl: 'gallery/image a 7.jpg' },
    { title: 'Tragedy', artistName: 'Clementina DebuQue', price: 921, imageUrl: 'gallery/image a13.jpg' },
    { title: 'Swan', artistName: 'Mr Dennis Schulist', price: 333, imageUrl: 'gallery/image a16.jpg' },
];

document.addEventListener('DOMContentLoaded', function () {
    const artistSelect = document.getElementById('artist-select');
    const filterButton = document.getElementById('filter-button');
    const filterPanel = document.getElementById('filter-panel');
    const applyButton = document.querySelector('.apply-button');
    const closeButton = document.getElementById('close-filter');
    const itemsContainer = document.querySelector('.listing-cards');

    // Function to render items
    function renderItems(items) {
        const itemsContainer = document.querySelector('.listing-cards'); 
        itemsContainer.innerHTML = ''; // Clear existing cards
    
        items.forEach(item => {
            console.log(`Rendering image: ${item.imageUrl}`); // Log image URL
    
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="Art Image" class="card-image">
                <div class="card-content">
                    <h3 class="artist-name">${item.artistName}</h3>
                    <h4 class="item-title">${item.title}</h4>
                    <p class="item-description">Lorem ipsum dolor sit amet...</p>
                </div>
                <div class="price-tag">$${item.price}</div>
            `;
            itemsContainer.appendChild(card);
        });
    }
    
    // Initial render
    renderItems(itemsArray);
    
    
    // Populate artist options
    itemsArray.forEach(item => {
        if (!Array.from(artistSelect.options).some(option => option.value === item.artistName)) {
            const option = document.createElement('option');
            option.value = item.artistName;
            option.textContent = item.artistName;
            artistSelect.appendChild(option);
        }
    });

    // Show the filter panel
    filterButton.addEventListener('click', function() {
        filterPanel.classList.add('open');
    });

    // Close the filter panel without filtering
    closeButton.addEventListener('click', function() {
        filterPanel.classList.remove('open');
    });

    // Filter and show results when Apply is clicked
    applyButton.addEventListener('click', function (event) {
        event.preventDefault(); 

        const itemName = document.getElementById('item-name').value.toLowerCase();
        const artistName = artistSelect.value;
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

        const filteredItems = itemsArray.filter(item => {
            const matchesName = itemName ? item.title.toLowerCase().includes(itemName) : true;
            const matchesArtist = artistName ? item.artistName === artistName : true;
            const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
            return matchesName && matchesArtist && matchesPrice;
        });

        renderItems(filteredItems); 
        filterPanel.classList.remove('open'); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container'); 

    // Retrieve items from local storage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p>Type: ${item.type}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <img src="${item.image}" alt="${item.title}" />
            <p>Published: ${item.isPublished ? 'Yes' : 'No'}</p>
        `;
        itemsContainer.appendChild(itemCard);
    });
});
function renderVisitorItems() {
    const itemsContainer = document.getElementById('visitorItemsContainer');
    itemsContainer.innerHTML = ''; 

    // Filter and display only published items
    itemsArray.filter(item => item.isPublished).forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        itemCard.innerHTML = `
            <img src="${item.image}" alt="Art Image">
            <div class="item-details">
                <h2>${item.title}</h2>
                <p>${item.dateCreated}</p>
                <p class="price">$${item.price}</p>
                <p>${item.description}</p>
            </div>
        `;

        itemsContainer.appendChild(itemCard);
    });
}

// Call this function when the visitor page loads
renderVisitorItems();


// Sample items array
const items = JSON.parse(localStorage.getItem('items')) || [
    { id: 1, title: 'Artwork Title', isPublished: false },
    { id: 2, title: 'Another Artwork', isPublished: true },
    // Add more items as needed
];

// Function to render items on the page
function renderItems() {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        // Create the item card HTML
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.setAttribute('data-item-id', item.id);

        itemCard.innerHTML = `
            <img src="gallery/image.jpg" alt="Art Image">
            <div class="item-details">
                <h2>${item.title}</h2>
                <p class="price">$999</p>
                <p>Description...</p>
            </div>
            <div class="item-buttons">
                <button class="toggle-publish-btn">${item.isPublished ? 'Unpublish' : 'Publish'}</button>
                <button class="remove-btn">Remove</button>
                <button class="edit-btn">Edit</button>
            </div>
        `;

        // Add event listener for the Publish/Unpublish button
        itemCard.querySelector('.toggle-publish-btn').addEventListener('click', () => togglePublish(item.id));

        itemsContainer.appendChild(itemCard);
    });
}

// Function to toggle the publish status of an item
function togglePublish(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.isPublished = !item.isPublished;
        localStorage.setItem('items', JSON.stringify(items)); 
        renderItems(); 
    }
}

// Initialize and render items on page load
document.addEventListener('DOMContentLoaded', renderItems);
