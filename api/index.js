const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Loan = require("./models/Loan")
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();
const app = express();
const bcyrptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "djgdngdfkgljfjfbflgfnfdblnkdghknlflnkgfngf";
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.userId = userData.userId;
    next();
  });
};

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcyrptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, userId: userDoc._id, },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email,_id} = await User.findById(userData.userId)
      res.json({name, email,_id});
    });
  } else {
    res.json(null);
  }
  
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true)
})


app.post('/loan',  authenticateUser,  async (req, res) => {
  try {
    const { borrowedAmount, interestRate, repaymentPeriod } = req.body;
    
   const loan =  await Loan.create({ userId: req.userId, borrowedAmount, interestRate, repaymentPeriod });
    res.status(201).json({loan, message: 'Loan application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/loan-status',  authenticateUser,  async (req, res) => {
  try {
    
    const loanStatus = await Loan.findOne({ userId: req.userId });
    res.status(200).json(loanStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/all-loans', authenticateUser, async (req,res) => {
  try {
    const loans = await Loan.find({});
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
