package com.footygear.repository;

import com.footygear.Product;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class InMemoryProductRepository {
    private final List<Product> products = new ArrayList<>();

 
    public Product save(Product product) {
        products.add(product);
        return product;
    }


    public Optional<Product> findByName(String name) {
        return products.stream()
                .filter(p -> p.getName().equals(name))
                .findFirst();
    }

    
    public void clear() {
        products.clear();
    }

    public List<Product> findAll() {
        return new ArrayList<>(products);
    }
}
