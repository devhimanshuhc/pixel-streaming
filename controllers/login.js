const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", msg: "Please enter all fields" });
  } else {
    db.query(
      "SELECT email FROM users WHERE email=? ",
      [email],
      async (error, result) => {
        if (error) throw error;
        if (!result[0] || !(await bcrypt.compare(password, result[0].password)))
          return res.json({ status: "error", error: "Invalid credentials" });
        else {
          const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
            httpOnly: true,
          });
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("userRegistered", token, cookieOptions);
          return res.json({ status: "ok", success: "User logged in" });
        }
      }
    );
  }
};

module.exports = login;
