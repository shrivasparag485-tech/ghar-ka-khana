const orders = JSON.parse(localStorage.getItem("orders")) || [];
const ratings = JSON.parse(localStorage.getItem("ratings")) || [];

document.getElementById("totalOrders").textContent = orders.length;

// Calculate revenue
let revenue = 0;

orders.forEach(order => {
    order.items.forEach(item => {
        revenue += item.price * item.quantity;
    });
});

document.getElementById("totalRevenue").textContent = "₹" + revenue;

// Average rating
if (ratings.length > 0) {
    let totalStars = ratings.reduce((sum, r) => sum + r.stars, 0);
    let avg = (totalStars / ratings.length).toFixed(1);
    document.getElementById("avgRating").textContent = avg + " ⭐";
} else {
    document.getElementById("avgRating").textContent = "No ratings yet";
}