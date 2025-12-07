package com.footygear.service;

import com.footygear.Product;
import com.footygear.repository.InMemoryProductRepository;

import java.util.Optional;

public class ProductService {

    private final InMemoryProductRepository repository;

    public ProductService(InMemoryProductRepository repository) {
        this.repository = repository;
    }

    
    public Product addProduct(String name, double price) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        Product product = new Product(name, price);
        return repository.save(product);
    }

    
    public Optional<Product> findProductByName(String name) {
        return repository.findByName(name);
    }

   
    public void clearProducts() {
        repository.clear();
    }
}
