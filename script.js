function generate() {
    let dictionary = "";

    // Check which options are selected and build the dictionary
    if (document.getElementById("lowercaseCb").checked) {
        dictionary += "abcdefghijklmnopqrstuvwxyz";
    }
    if (document.getElementById("uppercaseCb").checked) {
        dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (document.getElementById("digitsCb").checked) {
        dictionary += "0123456789";
    }
    if (document.getElementById("specialsCb").checked) {
        dictionary += "!@#$%^&*()_+-={}[]<>?:";
    }

    const length = document.querySelector('input[type="range"]').value;

    // Ensure valid settings
    if (length < 1 || dictionary.length === 0) {
        alert("Please select at least one character option!");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    // Set generated password to the input field
    document.querySelector('input[type="text"]').value = password;
}

// Event listeners for checkbox, button, and range slider
document.querySelectorAll('input[type="checkbox"], button.generate').forEach((elem) => {
    elem.addEventListener("click", generate);
});

document.querySelector('input[type="range"]').addEventListener("input", (e) => {
    // Display the updated password length
    document.querySelector("div.range span").textContent = e.target.value;
    generate();
});

document.querySelector("div.password button").addEventListener("click", () => {
    const pass = document.querySelector('input[type="text"]').value;

    // Copy password to clipboard
    navigator.clipboard.writeText(pass).then(() => {
        const copyButton = document.querySelector("div.password button");
        copyButton.textContent = "Copied!";
        setTimeout(() => {
            copyButton.textContent = "Copy";
        }, 1000); // Reset button text after 1 second
    });
});

// Generate an initial password on page load
generate();
