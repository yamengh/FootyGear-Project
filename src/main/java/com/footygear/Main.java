package com.footygear;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // Store inventory
        List<Product> inventory = new ArrayList<>();
        inventory.add(new Product("Football", 29.99));
        inventory.add(new Product("Soccer Shoes", 59.99));
        inventory.add(new Product("Jersey", 19.99));
        inventory.add(new Product("Goalkeeper Gloves", 24.99));

        // Customers
        Customer customer1 = new Customer("Khaleel");
        Customer customer2 = new Customer("Ammar");

        // Customer1 adds products
        customer1.addToCart(inventory.get(0)); // Football
        customer1.addToCart(inventory.get(1)); // Soccer Shoes

        // Customer2 adds products
        customer2.addToCart(inventory.get(2)); // Jersey
        customer2.addToCart(inventory.get(3)); // Gloves
        customer2.addToCart(inventory.get(0)); // Football

        // Checkout function
        checkout(customer1);
        checkout(customer2);
    }

    public static void checkout(Customer customer) {
        System.out.println("----------");
        System.out.println("Customer: " + customer.getName());
        if (customer.getCart().isEmpty()) {
            System.out.println("Cart is empty!");
            return;
        }
        System.out.println("Products in cart:");
        for (Product p : customer.getCart()) {
            System.out.println("- " + p.getName() + ": $" + p.getPrice());
        }
        System.out.printf("Total: $%.2f%n", customer.cartTotal());
        System.out.println("Thank you for shopping with FootyGear!");
    }
}
