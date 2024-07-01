/* scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle smooth scrolling
    function smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Add event listeners to navigation links for smooth scrolling
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            // Highlight active link
            document.querySelectorAll('.nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Event listener for Book Now button
    document.getElementById('book-now').addEventListener('click', () => {
        smoothScroll('#contact');
    });

    // State to hold customer reviews
    const reviews = [];

    // Function to display reviews
    function displayReviews() {
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-name">${review.name}</div>
                <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                <div class="review-comment">${review.comment}</div>
            </div>
        `).join('');
    }

    // Event listener for review submission
    document.getElementById('submit-review').addEventListener('click', () => {
        const name = document.getElementById('customer-name').value;
        const stars = parseInt(document.getElementById('star-rating').value);
        const comment = document.getElementById('comment').value;

        if (name && comment) {
            reviews.push({ name, stars, comment });
            displayReviews();
            // Clear form inputs
            document.getElementById('customer-name').value = '';
            document.getElementById('star-rating').value = '5';
            document.getElementById('comment').value = '';
        } else {
            alert('Please enter your name and comment.');
        }
    });

    // Initial display of reviews
    displayReviews();
});
