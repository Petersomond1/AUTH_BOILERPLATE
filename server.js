import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173" ], methods:["POST", "GET"], credentials: true}));
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost", // spot to put ip-address of the server
  user: "root", // "root" for windows, "mysql" for mac
  password: "", // "password" for windows, "root" for mac
  database: "authclient", // Now time to connect to http://localhost/phpmyadmin/ to see the database
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
         return res.json({ Error: "Authentication needed - No token found" });
    } else {
                jwt.verify(token, "jwtSecret", (err, decoded) => { 
                    if (err) { 
                        return res.json({ Error: "Invalid token" });
                    }else {
                    req.username = decoded.username;
                    next();
                    }
                })
            }
}

app.get("/", verifyUser,  (req, res) => {
  //  res.set('Access-Control-Allow-Origin', '*');
     return res.json({ Status: " Success", username: req.username });
})

app.post("/signup", (req, res) => {
   // res.set('Access-Control-Allow-Origin', '*');
    const sql = "INSERT INTO auth1 (username, email, password) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const values = [req.body.username, req.body.email, hash]

        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Error inserting data into server" });
            return res.json({ Status: "success" });
        })
        })

        
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM auth1 WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login Error querying server database" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Error comparing passwords" });
                if (response) {
                    const username = data[0].username;
                   const token = jwt.sign({ username }, "jwtSecret", { expiresIn: '1d' });
                    res.cookie("token", token);
                     return res.json({ Status: "Success" });
                } else {
                     return res.json({ Error: "Invalid  email or password not matched "});
                     }
        })
        } else { 
            return res.json({ Error: "NO email existed or User not found" });
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
})

app.listen(8081, () => {
  console.log("Running ...");
});