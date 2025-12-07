package com.footygear.service;

import com.footygear.Product;
import com.footygear.repository.InMemoryProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        InMemoryProductRepository repository = new InMemoryProductRepository();
        productService = new ProductService(repository);
    }

    @Test
    void addProduct_happyPath() {
        Product p = productService.addProduct("Football", 19.99);
        assertEquals("Football", p.getName());
        assertEquals(19.99, p.getPrice());
    }

    @Test
    void addProduct_invalidName_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class,
                () -> productService.addProduct("", 10));
        assertEquals("Name cannot be empty", exception.getMessage());
    }

    @Test
    void addProduct_negativePrice_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class,
                () -> productService.addProduct("Ball", -5));
        assertEquals("Price cannot be negative", exception.getMessage());
    }

    @Test
    void findProductByName_returnsProduct() {
        productService.addProduct("Shoes", 49.99);
        Optional<Product> found = productService.findProductByName("Shoes");
        assertTrue(found.isPresent());
        assertEquals("Shoes", found.get().getName());
    }

    @Test
    void findProductByName_notFound_returnsEmpty() {
        Optional<Product> found = productService.findProductByName("NonExistent");
        assertTrue(found.isEmpty());
    }
}
