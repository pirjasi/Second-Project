document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const carouselText = document.querySelector('.carousel-text-section p');

    // Longer text for each card
    const texts = [
        "Aenean suscipit sapien a mi ultrices, id tempus neque gravida. Sed vitae massa aliquet, lacinia quam ac, suscipit ex. Nulla facilisi. Suspendisse potenti.",
        "Curabitur sed lectus a nunc egestas consectetur. Morbi faucibus, libero vel tincidunt accumsan. Donec sagittis ligula sit amet nisi bibendum, a viverra odio luctus. Vivamus auctor dui id felis interdum, sit amet fermentum erat bibendum.",
        "Nulla facilisi. Nunc tempor orci eu libero vestibulum, nec consectetur nulla tincidunt. Cras quis nunc vel ex bibendum egestas. Fusce ultricies metus ut quam malesuada, ut consectetur dui volutpat."
    ];

    let currentIndex = 0;

    function updateCarousel() {
        // Hide all items and show only the current one
        items.forEach((item, index) => {
            item.style.display = index === currentIndex ? 'block' : 'none';
        });

        // Update the text according to the current index
        carouselText.textContent = texts[currentIndex];

        // Enable/disable buttons based on the current index
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === items.length - 1;
    }

    // Next button click event
    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Previous button click event
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initialize the carousel
    updateCarousel();
});