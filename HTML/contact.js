const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccess");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        full_name: document.getElementById("ct-name").value,
        email: document.getElementById("ct-email").value,
        phone: document.getElementById("ct-phone").value,
        service: document.getElementById("ct-service").value,
        subject: document.getElementById("ct-subject").value,
        message: document.getElementById("ct-msg").value
    };

    try {
        const response = await fetch("https://main-website.theoppty.com/api/contact/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            successMessage.style.display = "flex";
            contactForm.reset();
            console.log("Success:", data);
        } else {
            alert(data.error || "Something went wrong");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server error");
    }
});