package com.footygear.service;

import com.footygear.Customer;
import com.footygear.Product;
import com.footygear.repository.InMemoryCustomerRepository;
import com.footygear.repository.InMemoryProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class IntegrationTest {

    private ProductService productService;
    private CustomerService customerService;

    @BeforeEach
    void setUp() {
        productService = new ProductService(new InMemoryProductRepository());
        customerService = new CustomerService(new InMemoryCustomerRepository());
    }

    @Test
    void addProductAndRetrieveCustomerTest() {
        
        Product product = productService.addProduct("Shoes", 50.0);
        assertEquals("Shoes", product.getName());

    
        Customer customer = customerService.addCustomer("Alice", "alice@example.com");
        assertEquals("Alice", customer.getName());


        Optional<Customer> foundCustomer = customerService.findCustomerByEmail("alice@example.com");
        assertTrue(foundCustomer.isPresent());
        assertEquals("Alice", foundCustomer.get().getName());
    }
}
