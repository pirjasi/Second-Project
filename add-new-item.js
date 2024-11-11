document.addEventListener("DOMContentLoaded", function () {
    const snapshotButton = document.getElementById("snapshotButton");
    const fileInput = document.getElementById("fileInput");
    const snapshotPreview = document.getElementById("snapshotPreview");
    const addButton = document.getElementById("addButton");
    const cancelButton = document.getElementById("cancelButton");
    const isPublishedCheckbox = document.getElementById("isPublished"); 

    // Open file input when the snapshot area is clicked
    snapshotButton.addEventListener("click", function () {
        fileInput.click();
    });

    // Display the selected image as a preview
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                snapshotPreview.src = e.target.result;
                snapshotPreview.style.display = "block";
                document.querySelector(".snapshot-text").style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });

    // Add New Item functionality
    addButton.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Retrieve values from form fields
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const type = document.getElementById("type").value;
        const price = document.getElementById("price").value;
        const isPublished = isPublishedCheckbox.checked; // Get checkbox state
        const artist = "Artist123"; 

        if (!title || !price) {
            alert("Please fill in all required fields.");
            return;
        }

        // Create new item object
        const newItem = {
            id: Date.now(),
            title,
            description,
            type,
            price: parseFloat(price),
            image: snapshotPreview.src || "", 
            dateCreated: new Date().toLocaleDateString(),
            isPublished,
            artist
        };

        // Retrieve existing items or initialize an empty array
        let artistItems = JSON.parse(localStorage.getItem("artistItems")) || [];
        artistItems.push(newItem);

        // Save updated items array to localStorage
        localStorage.setItem("artistItems", JSON.stringify(artistItems));

        // Redirect to artist-itempage.html after adding the item
        window.location.href = "artist-itempage.html";
    });

    // Cancel button clears form fields and hides preview
    cancelButton.addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("type").value = "";
        document.getElementById("price").value = "";
        isPublishedCheckbox.checked = false; // Reset checkbox state
        snapshotPreview.src = "";
        snapshotPreview.style.display = "none";
        document.querySelector(".snapshot-text").style.display = "block";
    });

    // Edit Item functionality (for handling edit buttons on existing items)
    function attachEditListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const itemCard = this.closest(".item-card");
                const itemId = itemCard.dataset.id; // Ensure each item has a unique data-id

                // Retrieve items from localStorage
                const artistItems = JSON.parse(localStorage.getItem("artistItems")) || [];
                const itemToEdit = artistItems.find(item => item.id === parseInt(itemId));

                if (itemToEdit) {
                    sessionStorage.setItem("editItem", JSON.stringify(itemToEdit));
                    window.location.href = "add-new-item.html";
                }
            });
        });
    }

    // Attach the edit listeners after the page loads
    attachEditListeners();

   
    if (sessionStorage.getItem("editItem")) {
        const itemToEdit = JSON.parse(sessionStorage.getItem("editItem"));

        // Prefill form fields with existing item data
        document.getElementById("title").value = itemToEdit.title;
        document.getElementById("description").value = itemToEdit.description;
        document.getElementById("type").value = itemToEdit.type;
        document.getElementById("price").value = itemToEdit.price;
        document.getElementById("snapshotPreview").src = itemToEdit.image || "";
        document.getElementById("snapshotPreview").style.display = itemToEdit.image ? "block" : "none";
        document.querySelector(".snapshot-text").style.display = itemToEdit.image ? "none" : "block";

        // Set the checkbox to reflect the item's publish status
        isPublishedCheckbox.checked = itemToEdit.isPublished; 
    }
});
