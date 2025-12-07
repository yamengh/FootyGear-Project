// Product data with reliable image URLs from a CDN
const products = [
    {
        id: 1,
        name: 'Nike Mercurial Vapor',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'football boots',
        description: 'Lightweight football boots designed for speed and agility on the pitch.'
    },
    {
        id: 2,
        name: 'Adidas Predator Edge',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'football boots',
        description: 'Premium football boots with advanced ball control technology.'
    },
    {
        id: 3,
        name: 'Puma Future Z',
        price: 139.99,
        image: 'https://images.unsplash.com/photo-1600185365483-26c7a535bbfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'football boots',
        description: 'Dynamic fit for agile players who need quick movements.'
    },
    {
        id: 4,
        name: 'Nike Flight Football',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1579952363871-368c0f1b8a6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'footballs',
        description: 'Official match ball with high-performance design.'
    },
    {
        id: 5,
        name: 'Goalkeeper Gloves',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'accessories',
        description: 'Professional goalkeeper gloves with superior grip and protection.'
    },
    {
        id: 6,
        name: 'Training Cones (Set of 10)',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'training',
        description: 'Durable cones for training drills and exercises.'
    },
    {
        id: 7,
        name: 'Football Kit',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'apparel',
        description: 'Breathable and lightweight football jersey and shorts.'
    },
    {
        id: 8,
        name: 'Shin Guards',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'accessories',
        description: 'Professional shin guards with ankle protection.'
    }
];

// Cart functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');
const productGrid = document.getElementById('product-grid');
const cartModal = document.createElement('div');
cartModal.className = 'modal';
cartModal.id = 'cart-modal';
cartModal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Your Cart</h2>
        <div id="cart-items"></div>
        <div id="cart-total">Total: $0.00</div>
        <button id="checkout-btn" class="btn">Proceed to Checkout</button>
    </div>
`;
document.body.appendChild(cartModal);

// Fallback image URL
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508098682722-e99c47a06b43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

// Function to handle image loading errors
function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop if fallback also fails
    img.src = FALLBACK_IMAGE;
    img.alt = 'Product image not available';
}

// Display products with image error handling
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="image-container">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="product-image"
                    onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}'; this.alt='Product image not available'"
                    loading="lazy"
                >
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productElement);
    });

    // Add event listeners to the Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        showSuccessMessage('Item added to cart!');
    }
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    <button class="remove-btn" data-id="${item.id}">×</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
        
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', updateQuantity);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
}

// Update quantity function
function updateQuantity(e) {
    const productId = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
        updateCart();
    }
}

// Remove from cart function
function removeFromCart(e) {
    const productId = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showSuccessMessage('Item removed from cart!');
}

// Show success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    
    document.body.appendChild(successMessage);
    
    // Show the message
    setTimeout(() => {
        successMessage.style.display = 'block';
    }, 100);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 3000);
}

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would send this data to a server
        this.reset();
        showSuccessMessage('Thank you for your message! We will get back to you soon.');
    });
}

// Cart modal functionality
const cartIcon = document.querySelector('.cart-icon');
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');

cartIcon.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Checkout button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // In a real app, you would redirect to a checkout page
            alert('Proceeding to checkout!');
            cart = [];
            updateCart();
            modal.style.display = 'none';
        } else {
            alert('Your cart is empty!');
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});
