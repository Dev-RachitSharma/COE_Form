document.getElementById("enquiryForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const data = {
    fullName: document.getElementById("fullName").value,
    rollNo: document.getElementById("rollNo").value,
    branch: document.getElementById("branch").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    year: document.getElementById("year").value,
    division: document.getElementById("division").value,
    cgpa: document.getElementById("cgpa").value,
    skills: document.getElementById("skills").value
  };

  if (data.phone.length !== 10) {
    alert("Phone number must be exactly 10 digits.");
    resetButton(submitBtn);
    return;
  }
  if (data.cgpa < 0 || data.cgpa > 10) {
    alert("CGPA must be between 0 and 10.");
    resetButton(submitBtn);
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzRJVN9pZOils4KCjYLb60KqGlHuNWuMF0BVKexOpngMdxjOefV8dC2Nkdl8c9qCiEzMg/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    document.getElementById("enquiryForm").style.display = "none";   // ✅ Hide form
    document.getElementById("successMessage").style.display = "block"; // ✅ Show success
    resetButton(submitBtn);
    document.getElementById("enquiryForm").reset();
  })
  .catch(err => {
    alert("Error: " + err);
    resetButton(submitBtn);
  });
});

// ✅ Reset button helper
function resetButton(btn) {
  btn.disabled = false;
  btn.textContent = "Submit";
}

// ✅ New response button (reloads the form)
document.getElementById("newResponseBtn").addEventListener("click", function() {
  document.getElementById("enquiryForm").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
});
