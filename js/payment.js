function processPayment() {

    const method = document.getElementById("paymentMethod").value;

    if (!method) {
        alert("Please select payment method");
        return;
    }

    // Save payment method
    localStorage.setItem("paymentMethod", method);

    window.location.href = "tracking.html";
}