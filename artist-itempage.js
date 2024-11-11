document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const dragDropArea = document.getElementById("drag-drop-area");
    const previewImage = document.getElementById("preview-image");

    if (dragDropArea && fileInput) {
        dragDropArea.addEventListener("dragover", function (e) {
            e.preventDefault();
            dragDropArea.style.borderColor = "#00bfa5";
        });

        dragDropArea.addEventListener("dragleave", function (e) {
            dragDropArea.style.borderColor = "#ccc";
        });

        dragDropArea.addEventListener("drop", function (e) {
            e.preventDefault();
            dragDropArea.style.borderColor = "#ccc";
            const file = e.dataTransfer.files[0];
            displayPreview(file);
        });

        fileInput.addEventListener("change", function (e) {
            const file = e.target.files[0];
            displayPreview(file);
        });
    }

    function displayPreview(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }

    // Form Handling for Adding New Item
    const form = document.getElementById("new-item-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("New item added!");

        });
    }

    // Toggle Publish/Unpublish
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", function () {
            const isPublished = this.innerText === "Publish";
            this.innerText = isPublished ? "Unpublish" : "Publish";
            this.classList.toggle("published", isPublished);
        });
    });

    // Remove Item
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("Are you sure you want to remove this item?")) {
                const itemCard = this.closest(".item-card");
                itemCard.remove();
            }
        });
    });

    // Edit Item
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            alert("Editing functionality is under development.");
            
        });
    });

    // 'Add New Item' Button Redirect
    const addButton = document.getElementById("addButton");
    if (addButton) {
        addButton.addEventListener("click", function () {
            window.location.href = "add-new-item.html";
        });
    }

    // Render Items
    renderItems();
});

let itemsArray = [
    {
        id: 1,
        image: "gallery/image a20.jpg",
        title: "Dual Perspective Shadow",
        dateCreated: "2021-12-15",
        price: 999,
        description: "Lorem ipsum dolor sit amet...",
        type: "Painting",
        isPublished: true,
        artist: "LoggedArtist",
    },
    {
        id: 2,
        image: "gallery/image a19.jpg",
        title: "Sketch",
        dateCreated: "2024-01-21",
        price: 500,
        description: "Sample description for Sketch...",
        type: "Sketch",
        isPublished: true,
        artist: "LoggedArtist",
    }
];

function renderItems() {
    const itemsContainer = document.getElementById("itemsContainer");
    if (!itemsContainer) return;

    itemsContainer.innerHTML = ""; // Clear previous items

    itemsArray.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");

        itemCard.innerHTML = `
            <img src="${item.image}" alt="Art Image">
            <div class="item-details">
                <h2>${item.title}</h2>
                <p>${item.dateCreated}</p>
                <p class="price">$${item.price}</p>
                <p>${item.description}</p>
            </div>
            <div class="item-buttons">
                <button class="auction-btn">Send to Auction</button>
                <button class="toggle-btn" onclick="togglePublish(${item.id})">
                    ${item.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button class="remove-btn" onclick="confirmRemove(${item.id})">Remove</button>
                <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
            </div>
        `;

        itemsContainer.appendChild(itemCard);
    });
}

function togglePublish(itemId) {
    const item = itemsArray.find(i => i.id === itemId);
    if (item) {
        item.isPublished = !item.isPublished;
        renderItems(); // Re-render items to reflect changes
    }
}

function confirmRemove(itemId) {
    if (confirm("Are you sure you want to remove this item?")) {
        itemsArray = itemsArray.filter(item => item.id !== itemId);
        renderItems(); // Re-render items after deletion
    }
}

function editItem(itemId) {
    window.location.href = `artist-new-edit-item.html?id=${itemId}`;
}



document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.getElementById("itemsContainer");

    // Fetch items from localStorage
    let items = JSON.parse(localStorage.getItem("artistItems")) || [];

    // Render each item as a card
    items.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");

        // Item card structure
        itemCard.innerHTML = `
            <img src="${item.image}" alt="Art Image">
            <div class="item-details">
                <h2>${item.title}</h2>
                <p>${item.dateCreated}</p>
                <p class="price">$${item.price}</p>
                <p>${item.description}</p>
            </div>
            <div class="item-buttons">
                <button class="auction-btn">Send to Auction</button>
                <button class="toggle-btn">${item.isPublished ? 'Unpublish' : 'Publish'}</button>
                <button class="remove-btn">Remove</button>
                <button class="edit-btn">Edit</button>
            </div>
        `;

        // Append the newly created item card to the container
        itemsContainer.appendChild(itemCard);

        // Add event listener to the toggle button
        itemCard.querySelector(".toggle-btn").addEventListener("click", function () {
            item.isPublished = !item.isPublished;  // Toggle the isPublished value
            localStorage.setItem("artistItems", JSON.stringify(items));  // Save the updated items
            this.textContent = item.isPublished ? 'Unpublish' : 'Publish';  // Update button text
        });

        // Add event listener to the remove button
        itemCard.querySelector(".remove-btn").addEventListener("click", function () {
            if (confirm("Are you sure you want to remove this item?")) {
                items = items.filter(existingItem => existingItem.id !== item.id);
                localStorage.setItem("artistItems", JSON.stringify(items));  // Remove item from storage
                itemsContainer.removeChild(itemCard);  // Remove item card from the page
            }
        });

        // Add event listener to the edit button
        itemCard.querySelector(".edit-btn").addEventListener("click", function () {
            // Implement edit functionality if needed
            alert("Edit button clicked for: " + item.title);
        });
    });
});




function editItem(button) {
    // Find the item data from the button's parent element
    const itemCard = button.closest('.item-card');
    const item = {
        title: itemCard.querySelector('h2').textContent,
        description: itemCard.querySelector('p').textContent,
        price: itemCard.querySelector('.price').textContent.replace('$', ''),
        type: itemCard.dataset.type, 
        isPublished: itemCard.querySelector('.toggle-btn').textContent === 'Publish', // Assuming you toggle between 'Publish' and 'Unpublish'
        image: itemCard.querySelector('img').src
    };

    // Save the item data to localStorage
    localStorage.setItem('itemToEdit', JSON.stringify(item));

    // Redirect to the add-new-item.html page
    window.location.href = 'add-new-item.html';
}



