/* scripts.js */

/**
 * Wait until the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Handle navigation link clicks for smooth scrolling.
     */
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Set active class to the clicked link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /**
     * Scroll to contact section on Book Now button click.
     */
    const bookNowButton = document.getElementById('book-now');
    bookNowButton.addEventListener('click', function() {
        document.querySelector('.contact-details').scrollIntoView({ behavior: 'smooth' });
    });
});
