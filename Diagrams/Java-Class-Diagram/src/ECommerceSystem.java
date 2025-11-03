import java.util.Date;
import java.util.List;
import java.util.ArrayList;

/**
 * Main class to demonstrate the E-Commerce System.
 * This class contains the {@code main} method to simulate interactions
 * between customers, products, suppliers, and employees.
 *
 * @author YourName
 * @version 1.0
 */
public class ECommerceSystem {

    /**
     * The main entry point for the application.
     * Creates sample data and simulates a simple e-commerce workflow.
     *
     * @param args Command line arguments (not used).
     */
    public static void main(String[] args) {
      
        // Create a supplier
        Supplier vendor = new Supplier("S001", "TechDistro Inc.", "555-SUPP");
        vendor.sendProducts();

        // Create a product
        Product laptop = new Product("P101", "Laptop Pro", 1200.00, 50, "Electronics", vendor);
        laptop.displayInfo();
        laptop.updateStock(-5); // Simulate selling 5 laptops

        // Create a customer
        Customer alice = new Customer("C001", "Alice Smith", "alice@example.com", "123 Main St");
        alice.placeOrder();

        // Create an order item
        OrderItem item1 = new OrderItem(laptop, 2);

        // Create an order
        Order order1 = new Order("O2024-001", alice);
        order1.addItem(item1);

        // Process the order
        order1.calculateOrder();
        order1.updateStatus("Shipped");

        // Create an employee
        Employee bob = new Employee("E300", "Bob Johnson", "Warehouse Manager", 65000.00);
        bob.manageInventory();
        bob.processOrder(order1);
    }
}

/**
 * Represents a product supplier or vendor.
 */
class Supplier {
    private String supplierID;
    private String name;
    private String contactInfo;

    /**
     * Constructs a new Supplier.
     *
     * @param supplierID  The unique identifier for the supplier.
     * @param name        The supplier's company name.
     * @param contactInfo The supplier's contact phone or email.
     */
    public Supplier(String supplierID, String name, String contactInfo) {
        this.supplierID = supplierID;
        this.name = name;
        this.contactInfo = contactInfo;
    }

    /**
     * Simulates the supplier sending products to the warehouse.
     */
    public void sendProducts() {
        System.out.println("Supplier " + name + " is sending products.");
    }

    /**
     * Simulates the supplier updating their available product list.
     */
    public void updateProductList() {
        System.out.println("Supplier " + name + " is updating product list.");
    }
}

/**
 * Represents a customer of the e-commerce store.
 */
class Customer {
    private String customerID;
    private String name;
    private String email;
    private String address;

    /**
     * Constructs a new Customer.
     *
     * @param customerID The unique identifier for the customer.
     * @param name       The customer's full name.
     * @param email      The customer's email address.
     * @param address    The customer's shipping address.
     */
    public Customer(String customerID, String name, String email, String address) {
        this.customerID = customerID;
        this.name = name;
        this.email = email;
        this.address = address;
    }

    /**
     * Simulates the customer placing a new order.
     */
    public void placeOrder() {
        System.out.println(name + " is placing an order.");
    }

    /**
     * Simulates the customer viewing their past order history.
     */
    public void viewOrders() {
        System.out.println(name + " is viewing their past orders.");
    }
}

/**
 * Represents a product available for sale in the e-commerce system.
 */
class Product {
    private String productID;
    private String name;
    private double price;
    private int stockQuantity;
    private String category;
    private Supplier supplier;

    /**
     * Constructs a new Product.
     *
     * @param productID     The unique identifier for the product.
     * @param name          The display name of the product.
     * @param price         The selling price of the product.
     * @param stockQuantity The current quantity in stock.
     * @param category      The category the product belongs to (e.g., "Electronics").
     * @param supplier      The Supplier object that provides this product.
     */
    public Product(String productID, String name, double price, int stockQuantity, String category, Supplier supplier) {
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.supplier = supplier;
    }

    /**
     * Updates the stock quantity by adding or removing items.
     *
     * @param amount The number of items to add (positive) or remove (negative).
     */
    public void updateStock(int amount) {
        this.stockQuantity += amount;
        System.out.println("Stock updated for " + name + ". New quantity: " + stockQuantity);
    }

    /**
     * Prints the product's basic information to the console.
     */
    public void displayInfo() {
        System.out.println("Product: " + name + ", Price: $" + price + ", Stock: " + stockQuantity);
    }

    /**
     * Gets the price of the product.
     *
     * @return The product's price as a double.
     */
    public double getPrice() { return price; }

    /**
     * Gets the name of the product.
     *
     * @return The product's name as a String.
     */
    public String getName() { return name; }
}

/**
 * Represents a single item (and its quantity) within an Order.
 */
class OrderItem {
    private int quantity;
    private double subtotal;
    private Product product;

    /**
     * Constructs a new OrderItem.
     * The subtotal is automatically calculated upon creation.
     *
     * @param product  The Product object for this item.
     * @param quantity The number of units of the product.
     */
    public OrderItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
        this.subtotal = calculateSubtotal();
    }

    /**
     * Calculates the subtotal for this line item (price * quantity).
     *
     * @return The calculated subtotal as a double.
     */
    public double calculateSubtotal() {
        this.subtotal = this.product.getPrice() * this.quantity;
        System.out.println("Calculated subtotal for " + product.getName() + ": $" + subtotal);
        return this.subtotal;
    }

    /**
     * Gets the pre-calculated subtotal for this item.
     *
     * @return The subtotal as a double.
     */
    public double getSubtotal() { return subtotal; }
}

/**
 * Represents a customer's order, containing a list of OrderItems.
 */
class Order {
    private String orderID;
    private Date orderDate;
    private double totalAmount;
    private String status;
    private Customer customer;
    private List<OrderItem> items;

    /**
     * Constructs a new Order.
     * Initializes the order with a current date and "Pending" status.
     *
     * @param orderID  The unique identifier for the order.
     * @param customer The Customer who placed the order.
     */
    public Order(String orderID, Customer customer) {
        this.orderID = orderID;
        this.customer = customer;
        this.orderDate = new Date();
        this.totalAmount = 0.0;
        this.status = "Pending";
        this.items = new ArrayList<>();
    }

    /**
     * Adds a new OrderItem to this order.
     *
     * @param item The OrderItem to add.
     */
    public void addItem(OrderItem item) {
        this.items.add(item);
    }

    /**
     * Calculates the total amount for the entire order by summing
     * the subtotals of all OrderItems.
     *
     * @return The total amount for the order.
     */
    public double calculateOrder() {
        this.totalAmount = 0;
        for (OrderItem item : items) {
            this.totalAmount += item.getSubtotal();
        }
        System.out.println("Order " + orderID + " calculated. Total: $" + totalAmount);
        return totalAmount;
    }

    /**
     * Updates the status of the order.
     *
     * @param newStatus The new status (e.g., "Shipped", "Delivered").
     */
    public void updateStatus(String newStatus) {
        this.status = newStatus;
        System.out.println("Order " + orderID + " status updated to: " + newStatus);
    }

    /**
     * Gets the order's unique identifier.
     *
     * @return The order ID as a String.
     */
    public String getOrderID() { return orderID; }
}

/**
 * Represents an employee who manages the e-commerce system.
 */
class Employee {
    private String employeeID;
    private String name;
    private String position;
    private double salary;

    /**
     * Constructs a new Employee.
     *
     * @param employeeID The unique identifier for the employee.
     * @param name       The employee's full name.
     * @param position   The employee's job title.
     * @param salary     The employee's salary.
     */
    public Employee(String employeeID, String name, String position, double salary) {
        this.employeeID = employeeID;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    /**
     * Simulates the employee managing product inventory.
     */
    public void manageInventory() {
        System.out.println(name + " is managing inventory.");
    }

    /**
     * Simulates the employee processing a specific customer order.
     *
     * @param order The Order object to be processed.
     */
    public void processOrder(Order order) {
        System.out.println(name + " is processing Order ID: " + order.getOrderID());
    }
}
