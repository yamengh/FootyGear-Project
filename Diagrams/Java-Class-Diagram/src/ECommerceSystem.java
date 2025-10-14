import java.util.Date;
import java.util.List;
import java.util.ArrayList;


git public class ECommerceSystem {

    public static void main(String[] args) {
     

     
        Supplier vendor = new Supplier("S001", "TechDistro Inc.", "555-SUPP");
        vendor.sendProducts();

    
        Product laptop = new Product("P101", "Laptop Pro", 1200.00, 50, "Electronics", vendor);
        laptop.displayInfo();
        laptop.updateStock(-5); 

       
        Customer alice = new Customer("C001", "Alice Smith", "alice@example.com", "123 Main St");
        alice.placeOrder();

       
        OrderItem item1 = new OrderItem(laptop, 2);

       
        Order order1 = new Order("O2024-001", alice);
        order1.addItem(item1);

       
        order1.calculateOrder();
        order1.updateStatus("Shipped");

      
        Employee bob = new Employee("E300", "Bob Johnson", "Warehouse Manager", 65000.00);
        bob.manageInventory();
        bob.processOrder(order1);
    }
}



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
    
        this.subtotal = calculateSubtotal();
    }

    public double calculateSubtotal() {
   
        this.subtotal = this.product.getPrice() * this.quantity;
        System.out.println("Calculated subtotal for " + product.getName() + ": $" + subtotal);
        return this.subtotal;
    }

  
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
        
            this.totalAmount += item.getSubtotal();
        }
        System.out.println("Order " + orderID + " calculated. Total: $" + totalAmount);
        return totalAmount;
    }

    public void updateStatus(String newStatus) {
        this.status = newStatus;
        System.out.println("Order " + orderID + " status updated to: " + newStatus);
    }

    
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
  
        System.out.println(name + " is processing Order ID: " + order.getOrderID());
    }
}
