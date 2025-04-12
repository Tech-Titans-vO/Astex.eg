// Product data
const products = {
    'Round-Black': {
        name: 'Round Black',
        price: '$99.99',
        description: 'Premium quality round black product with modern design and superior comfort.',
        features: [
            'High-quality materials',
            'Comfortable fit',
            'Durable construction',
            'Modern design'
        ],
        images: [
            'Imgs/Round-Black.jpeg',
            'Imgs/Round-Black-2.jpeg',
            'Imgs/Round-Black-3.jpeg'
        ]
    },
    'Round-Green': {
        name: 'Round Green',
        price: '$149.99',
        description: 'Stylish round green product with unique features and excellent craftsmanship.',
        features: [
            'Premium materials',
            'Ergonomic design',
            'Long-lasting quality',
            'Unique color'
        ],
        images: [
            'Imgs/Round-Green-Face.jpeg',
            'Imgs/Round-Green-2.jpeg',
            'Imgs/Round-Green-3.jpeg'
        ]
    },
    'Quarter-Zipper': {
        name: 'Quarter Zipper',
        price: '$199.99',
        description: 'Innovative quarter zipper design with advanced features and premium quality.',
        features: [
            'Innovative design',
            'Premium materials',
            'Advanced features',
            'Superior comfort'
        ],
        images: [
            'Imgs/Quarter-Zipper-Face.jpeg',
            'Imgs/Quarter-Zipper-2.jpeg',
            'Imgs/Quarter-Zipper-3.jpeg'
        ]
    }
};

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Update product details
function updateProductDetails() {
    const product = products[productId];
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Update main content
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;

    // Update features
    const featuresList = document.getElementById('productFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Update images
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.src = product.images[index];
        thumb.alt = `${product.name} - View ${index + 1}`;
    });
}

// Thumbnail click handler
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Update main image
        document.getElementById('mainProductImage').src = thumb.src;

        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// Quantity controls
document.getElementById('decreaseQuantity').addEventListener('click', () => {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

document.getElementById('increaseQuantity').addEventListener('click', () => {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

// Add to cart functionality
document.getElementById('addToCart').addEventListener('click', () => {
    const product = products[productId];
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Add to cart
    for (let i = 0; i < quantity; i++) {
        cart.push({
            name: product.name,
            price: product.price
        });
    }
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    
    // Show notification
    showNotification(`${quantity} ${product.name} added to cart!`);
});

// Initialize page
updateProductDetails(); 