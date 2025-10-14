import java.util.Date;
import java.util.List;
import java.util.ArrayList;

// The main public class that must match the file name.
git public class ECommerceSystem {

    public static void main(String[] args) {
        // --- Demonstration/Test Block ---

        // 1. Create a Supplier
        Supplier vendor = new Supplier("S001", "TechDistro Inc.", "555-SUPP");
        vendor.sendProducts();

        // 2. Create a Product
        Product laptop = new Product("P101", "Laptop Pro", 1200.00, 50, "Electronics", vendor);
        laptop.displayInfo();
        laptop.updateStock(-5); // Sell 5 units

        // 3. Create a Customer
        Customer alice = new Customer("C001", "Alice Smith", "alice@example.com", "123 Main St");
        alice.placeOrder();

        // 4. Create Order Items
        OrderItem item1 = new OrderItem(laptop, 2);

        // 5. Create an Order
        Order order1 = new Order("O2024-001", alice);
        order1.addItem(item1);

        // 6. Process the Order
        order1.calculateOrder();
        order1.updateStatus("Shipped");

        // 7. Create an Employee
        Employee bob = new Employee("E300", "Bob Johnson", "Warehouse Manager", 65000.00);
        bob.manageInventory();
        bob.processOrder(order1);
    }
}

// --- Supporting Classes (Package-Private) ---

class Supplier {
    private String supplierID;
    private String name;
    private String contactInfo;

    public Supplier(String supplierID, String name, String contactInfo) {
        this.supplierID = supplierID;
        this.name = name;
        this.contactInfo = contactInfo;
    }

    public void sendProducts() {
        System.out.println("Supplier " + name + " is sending products.");
    }

    public void updateProductList() {
        System.out.println("Supplier " + name + " is updating product list.");
    }
}

class Customer {
    private String customerID;
    private String name;
    private String email;
    private String address;

    public Customer(String customerID, String name, String email, String address) {
        this.customerID = customerID;
        this.name = name;
        this.email = email;
        this.address = address;
    }

    public void placeOrder() {
        System.out.println(name + " is placing an order.");
    }

    public void viewOrders() {
        System.out.println(name + " is viewing their past orders.");
    }
}

class Product {
    private String productID;
    private String name;
    private double price;
    private int stockQuantity;
    private String category;

    private Supplier supplier;

    public Product(String productID, String name, double price, int stockQuantity, String category, Supplier supplier) {
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.supplier = supplier;
    }

    public void updateStock(int amount) {
        this.stockQuantity += amount;
        System.out.println("Stock updated for " + name + ". New quantity: " + stockQuantity);
    }

    public void displayInfo() {
        System.out.println("Product: " + name + ", Price: $" + price + ", Stock: " + stockQuantity);
    }

    // ESSENTIAL GETTERS: Accessing private fields from other classes
    public double getPrice() { return price; }
    public String getName() { return name; }
}

class OrderItem {
    private int quantity;
    private double subtotal;

    private Product product;

    public OrderItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
        // NOTE: calculateSubtotal must be called after product and quantity are set
        this.subtotal = calculateSubtotal();
    }

    public double calculateSubtotal() {
        // Accessing private price and name from Product via public getters
        this.subtotal = this.product.getPrice() * this.quantity;
        System.out.println("Calculated subtotal for " + product.getName() + ": $" + subtotal);
        return this.subtotal;
    }

    // ESSENTIAL GETTER: Accessing private subtotal from Order
    public double getSubtotal() { return subtotal; }
}

class Order {
    private String orderID;
    private Date orderDate;
    private double totalAmount;
    private String status;

    private Customer customer;
    private List<OrderItem> items;

    public Order(String orderID, Customer customer) {
        this.orderID = orderID;
        this.customer = customer;
        this.orderDate = new Date();
        this.totalAmount = 0.0;
        this.status = "Pending";
        this.items = new ArrayList<>();
    }

    public void addItem(OrderItem item) {
        this.items.add(item);
    }

    public double calculateOrder() {
        this.totalAmount = 0;
        for (OrderItem item : items) {
            // Accessing private subtotal from OrderItem via public getter
            this.totalAmount += item.getSubtotal();
        }
        System.out.println("Order " + orderID + " calculated. Total: $" + totalAmount);
        return totalAmount;
    }

    public void updateStatus(String newStatus) {
        this.status = newStatus;
        System.out.println("Order " + orderID + " status updated to: " + newStatus);
    }

    // ESSENTIAL GETTER: Accessing private orderID from Employee
    public String getOrderID() { return orderID; }
}

class Employee {
    private String employeeID;
    private String name;
    private String position;
    private double salary;

    public Employee(String employeeID, String name, String position, double salary) {
        this.employeeID = employeeID;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    public void manageInventory() {
        System.out.println(name + " is managing inventory.");
    }

    public void processOrder(Order order) {
        // Accessing private orderID from Order via public getter
        System.out.println(name + " is processing Order ID: " + order.getOrderID());
    }
}