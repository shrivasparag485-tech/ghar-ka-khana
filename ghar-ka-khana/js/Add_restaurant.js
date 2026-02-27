const form = document.getElementById("restaurantForm");
const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const successMessage = document.getElementById("successMessage");


// Image Preview
imageUpload.addEventListener("change", function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});


// Form Validation + Submit
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address");
        return;
    }

    if (!phone.match(phonePattern)) {
        alert("Phone number must be 10 digits");
        return;
    }

    successMessage.style.display = "block";
    form.reset();
    previewImage.style.display = "none";
});