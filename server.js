const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src', 'main', 'resources')));

// Sample product data (in a real app, this would be in a database)
const products = [
    {
        id: 1,
        name: 'Nike Mercurial Vapor',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'football boots',
        description: 'Lightweight football boots for speed and agility on the pitch.'
    },
    // ... (other products from the frontend data)
];

// In-memory cart (in a real app, use a database)
let cart = [];

// API Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

app.get('/api/cart', (req, res) => {
    res.json(cart);
});

app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity || 1;
    } else {
        cart.push({
            ...product,
            quantity: quantity || 1
        });
    }
    
    res.status(201).json({ message: 'Item added to cart', cart });
});

app.delete('/api/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const initialLength = cart.length;
    cart = cart.filter(item => item.id !== productId);
    
    if (cart.length === initialLength) {
        return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    res.json({ message: 'Item removed from cart', cart });
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'main', 'resources', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
