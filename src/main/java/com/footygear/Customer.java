package com.footygear;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Customer {
    private final String name;
    private final List<Product> cart = new ArrayList<>();

    public Customer(String name) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name required");
        this.name = name;
    }

    public String getName() { return name; }

    public void addToCart(Product p) {
        if (p == null) throw new IllegalArgumentException("Product required");
        cart.add(p);
    }

    public List<Product> getCartItems() {
        return Collections.unmodifiableList(cart);
    }

    public double cartTotal() {
        return cart.stream().mapToDouble(Product::getPrice).sum();
    }
}
