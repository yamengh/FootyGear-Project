package com.footygear;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    @Test
    void createProductHappyPath() {
        Product p = new Product("Boots", 100);
        assertEquals("Boots", p.getName());
        assertEquals(100, p.getPrice());
    }

    @Test
    void priceAfterDiscountHappy() {
        Product p = new Product("Boots", 100);
        assertEquals(90, p.priceAfterDiscount(10));
    }

    @Test
    void createProductWithEmptyNameThrows() {
        assertThrows(IllegalArgumentException.class, () -> new Product("", 50));
    }

    @Test
    void createProductWithNegativePriceThrows() {
        assertThrows(IllegalArgumentException.class, () -> new Product("Boots", -10));
    }

    @Test
    void priceAfterDiscountInvalidThrows() {
        Product p = new Product("Boots", 100);
        assertThrows(IllegalArgumentException.class, () -> p.priceAfterDiscount(-5));
        assertThrows(IllegalArgumentException.class, () -> p.priceAfterDiscount(150));
    }
}

