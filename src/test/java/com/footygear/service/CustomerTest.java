package com.footygear.service;

import com.footygear.Customer;
import com.footygear.repository.InMemoryCustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class CustomerServiceTest {

    private CustomerService customerService;

    @BeforeEach
    void setUp() {
        InMemoryCustomerRepository repository = new InMemoryCustomerRepository();
        customerService = new CustomerService(repository);
    }

    @Test
    void addCustomer_happyPath() {
        Customer c = customerService.addCustomer("John Doe", "john@example.com");
        assertEquals("John Doe", c.getName());
        assertEquals("john@example.com", c.getEmail());
    }

    @Test
    void addCustomer_emptyName_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class,
                () -> customerService.addCustomer("", "john@example.com"));
        assertEquals("Name cannot be empty", exception.getMessage());
    }

    @Test
    void addCustomer_emptyEmail_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class,
                () -> customerService.addCustomer("John Doe", ""));
        assertEquals("Email cannot be empty", exception.getMessage());
    }

    @Test
    void findCustomerByEmail_returnsCustomer() {
        customerService.addCustomer("Alice", "alice@example.com");
        Optional<Customer> found = customerService.findCustomerByEmail("alice@example.com");
        assertTrue(found.isPresent());
        assertEquals("Alice", found.get().getName());
    }

    @Test
    void findCustomerByEmail_notFound_returnsEmpty() {
        Optional<Customer> found = customerService.findCustomerByEmail("nonexistent@example.com");
        assertTrue(found.isEmpty());
    }
}
