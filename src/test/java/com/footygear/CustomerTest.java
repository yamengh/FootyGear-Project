package com.footygear;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CustomerTest {

    @Test
    void createCustomerHappyPath() {
        Customer c = new Customer("Khaleel");
        assertEquals("Khaleel", c.getName());
        assertTrue(c.getCartItems().isEmpty());
    }

    @Test
    void addProductToCartHappy() {
        Customer c = new Customer("Khaleel");
        Product p = new Product("Boots", 100);
        c.addToCart(p);
        assertEquals(1, c.getCartItems().size());
        assertEquals(100, c.cartTotal());
    }

    @Test
    void createCustomerWithEmptyNameThrows() {
        assertThrows(IllegalArgumentException.class, () -> new Customer(""));
    }

    @Test
    void addNullProductThrows() {
        Customer c = new Customer("Khaleel");
        assertThrows(IllegalArgumentException.class, () -> c.addToCart(null));
    }
}

