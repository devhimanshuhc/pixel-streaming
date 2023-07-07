form.addEventListener("submit", () => {
  const login = {
    email: email.value,
    password: password.value,
  };
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        success.style.display = "block";
        error.style.display = "none";
        error.innerText = data.error;
        window.location.href = "/loginPage";
      } else {
        error.style.display = "block";
        success.style.display = "none";
        success.innerText = data.success;
      }
    });
});
