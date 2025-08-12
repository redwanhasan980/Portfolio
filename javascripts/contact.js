function navigate(url) {
  window.location.href = url;
}

emailjs.init("IfJ29yDOc2c5dySHP"); // Your public key

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupLoading = document.getElementById("popup-loading");
const popupCloseBtn = document.getElementById("popup-close-btn");

// Close popup on button click
popupCloseBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Show popup and loading spinner, clear message text
  popup.classList.remove("hidden");
  popupLoading.style.display = "block";
  popupMessage.textContent = "";

  emailjs.sendForm("service_6sytgwo", "template_gkout2n", this)
    .then(function(response) {
      // Hide loader, show success message
      popupLoading.style.display = "none";
      popupMessage.textContent = "✅ Message sent successfully!";
      document.getElementById("contact-form").reset();
    }, function(error) {
      // Hide loader, show error message
      popupLoading.style.display = "none";
      popupMessage.textContent = "❌ Failed to send message. Please try again.";
      console.error("EmailJS error:", error);
    });
});
