const db = require("../routes/db-config.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password: Npassword } = req.body;
  if (!email || !Npassword) {
    return res
      .status(400)
      .json({ status: "error", msg: "Please enter all fields" });
  } else {
    console.log(email);
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (results[0]) {
          return res.json({ status: "error", msg: "Email already exists" });
        } else {
          const password = await bcrypt.hash(Npassword, 8);
          console.log(password);
          db.query(
            "INSERT INTO users SET ?",
            { email: email, password: password },
            (error, results) => {
              if (error) throw error;
              return res.json({ status: "ok", success: "User registered" });
            }
          );
        }
      }
    );
  }
};

module.exports = register;
