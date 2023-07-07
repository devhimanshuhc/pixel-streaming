form.addEventListener("submit", () => {
  const register = {
    email: email.value,
    password: password.value,
  };
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(register),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        success.style.display = "block";
        error.style.display = "none";
        error.innerText = data.error;
        window.location.href = "/registration";
      } else {
        error.style.display = "block";
        success.style.display = "none";
        success.innerText = data.success;
      }
    });
});
