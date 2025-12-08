// Product data with guaranteed working images
const products = [
    {
        id: 1,
        name: 'Nike Mercurial Vapor',
        price: 149.99,
        image: 'https://placehold.co/400x300/667eea/white?text=Nike+Boots',
        category: 'football boots',
        description: 'Lightweight football boots designed for speed and agility on the pitch.'
    },
    {
        id: 2,
        name: 'Adidas Predator Edge',
        price: 159.99,
        image: 'https://placehold.co/400x300/764ba2/white?text=Adidas+Boots',
        category: 'football boots',
        description: 'Premium football boots with advanced ball control technology.'
    },
    {
        id: 3,
        name: 'Puma Future Z',
        price: 139.99,
        image: 'https://placehold.co/400x300/f59e0b/white?text=Puma+Boots',
        category: 'football boots',
        description: 'Dynamic fit for agile players who need quick movements.'
    },
    {
        id: 4,
        name: 'Nike Flight Football',
        price: 89.99,
        image: 'https://placehold.co/400x300/10b981/white?text=Football',
        category: 'footballs',
        description: 'Official match ball with high-performance design.'
    },
    {
        id: 5,
        name: 'Goalkeeper Gloves',
        price: 69.99,
        image: 'https://placehold.co/400x300/1f2937/white?text=GK+Gloves',
        category: 'accessories',
        description: 'Professional goalkeeper gloves with superior grip and protection.'
    },
    {
        id: 6,
        name: 'Training Cones Set',
        price: 19.99,
        image: 'https://placehold.co/400x300/ef4444/white?text=Cones',
        category: 'training',
        description: 'Durable cones for training drills and exercises.'
    },
    {
        id: 7,
        name: 'Football Kit Jersey',
        price: 129.99,
        image: 'https://placehold.co/400x300/3b82f6/white?text=Jersey',
        category: 'apparel',
        description: 'Breathable and lightweight football jersey.'
    },
    {
        id: 8,
        name: 'Shin Guards',
        price: 29.99,
        image: 'https://placehold.co/400x300/8b5cf6/white?text=Shin+Guards',
        category: 'accessories',
        description: 'Professional shin guards with ankle protection.'
    }
];

// Cart functionality
let cart = [];
let currentFilter = 'all';
const cartCount = document.querySelector('.cart-count');
const productGrid = document.getElementById('product-grid');

// Use existing modal from HTML instead of creating new one
const cartModal = document.getElementById('cart-modal');

// Fallback image URL
const FALLBACK_IMAGE = 'https://placehold.co/400x300/cccccc/666666?text=Image+Not+Found';

// Function to handle image loading errors
function handleImageError(img) {
    img.onerror = null;
    img.src = FALLBACK_IMAGE;
    img.alt = 'Product image not available';
}

// Filter products function
function filterProducts(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });

    displayProducts();
}

// Subscribe newsletter function
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    alert('Thank you for subscribing with: ' + email);
    event.target.reset();
}

// Display products with filter support
function displayProducts() {
    if (!productGrid) return;

    productGrid.innerHTML = '';

    const filteredProducts = currentFilter === 'all'
        ? products
        : products.filter(p => p.category === currentFilter);

    filteredProducts.forEach(product => {
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

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

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
    localStorage.setItem('cart', JSON.stringify(cart));
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
    contactForm.addEventListener('submit', function (e) {
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
    checkAuthStatus();
});

// Authentication functionality
const API_BASE = window.location.origin + '/api/auth';

async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_BASE}/check`, {
            credentials: 'include'
        });

        const data = await response.json();

        const userMenu = document.getElementById('user-menu');
        const authButtons = document.getElementById('auth-buttons');
        const userName = document.getElementById('user-name');

        if (data.authenticated && data.user) {
            // User is logged in
            if (userMenu && authButtons && userName) {
                userMenu.style.display = 'flex';
                authButtons.style.display = 'none';
                userName.textContent = data.user.name;
            }
        } else {
            // User is not logged in
            if (userMenu && authButtons) {
                userMenu.style.display = 'none';
                authButtons.style.display = 'flex';
            }
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_BASE}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            const data = await response.json();

            if (data.success) {
                showSuccessMessage('Logged out successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Error logging out. Please try again.');
        }
    });
}
