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
        smoothScroll('#reservation');
    });

    // State to hold customer reviews
    const reviews = [];

    // Function to display reviews
    function displayReviews() {
        fetch('http://localhost:3000/reviews')
            .then(response => response.json())
            .then(data => {
                const reviewList = document.getElementById('review-list');
                reviewList.innerHTML = data.map(review => `
                    <div class="review-item">
                        <div class="review-name">${review.name}</div>
                        <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                        <div class="review-comment">${review.comment}</div>
                    </div>
                `).join('');
            });
    }

    // Event listener for review submission
    document.getElementById('submit-review').addEventListener('click', () => {
        const name = document.getElementById('customer-name').value;
        const stars = parseInt(document.getElementById('star-rating').value);
        const comment = document.getElementById('comment').value;

        if (name && comment) {
            fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, stars, comment })
            })
            .then(response => response.json())
            .then(() => {
                displayReviews();
                // Clear form inputs
                document.getElementById('customer-name').value = '';
                document.getElementById('star-rating').value = '5';
                document.getElementById('comment').value = '';
            });
        } else {
            alert('Please enter your name and comment.');
        }
    });

    // Event listener for reservation submission
    document.getElementById('reservation-form').addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('res-name').value;
        const phone = document.getElementById('res-phone').value;
        const service = document.getElementById('res-service').value;
        const datetime = document.getElementById('res-datetime').value;

        if (name && phone && service && datetime) {
            fetch('http://localhost:3000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, service, datetime })
            })
            .then(response => response.json())
            .then(() => {
                alert('Reservation successfully submitted!');
                // Clear form inputs
                document.getElementById('res-name').value = '';
                document.getElementById('res-phone').value = '';
                document.getElementById('res-service').value = '';
                document.getElementById('res-datetime').value = '';
            });
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Initial display of reviews
    displayReviews();
});
