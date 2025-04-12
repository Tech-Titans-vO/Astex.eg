// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert menu toggle button
    navContainer.insertBefore(menuToggle, navLinks);
    
    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Cart functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Add to cart
        cart.push({
            name: productName,
            price: productPrice
        });
        
        // Update cart count
        cartCount.textContent = cart.length;
        
        // Show notification
        showNotification(`${productName} added to cart!`);
    });
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#333';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Product filtering
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const productCards = document.querySelectorAll('.product-card');

categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    
    productCards.forEach(card => {
        const category = card.dataset.category;
        const price = parseFloat(card.dataset.price);
        
        let showCategory = selectedCategory === 'all' || category === selectedCategory;
        let showPrice = true;
        
        if (selectedPrice === 'low') {
            showPrice = price <= 100;
        } else if (selectedPrice === 'high') {
            showPrice = price > 100;
        }
        
        card.style.display = showCategory && showPrice ? 'block' : 'none';
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
    });
}

// Newsletter form handling
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to a server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        showNotification('Thank you for subscribing!');
        
        // Reset form
        form.reset();
    });
});
