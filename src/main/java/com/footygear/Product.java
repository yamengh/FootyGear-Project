package com.footygear;

public class Product {
    private final String name;
    private final double price;

    public Product(String name, double price) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name required");
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative");
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }

    public double priceAfterDiscount(double percent) {
        if (percent < 0 || percent > 100) throw new IllegalArgumentException("Invalid discount percent");
        return price - (price * percent / 100.0);
    }
}
