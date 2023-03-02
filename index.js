var express = require("express");
var cors = require("cors");
var dal = require("./dal.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
//const authMiddleware = require("./auth");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const accessTokenSecret = "somerandomaccesstoken";
const refreshTokenSecret = "somerandomstringforrefreshtoken";
const refreshTokens = [];

const app = express();
// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(`Headers: ${JSON.stringify(req.headers)}`);
  //console.log(`Body: ${JSON.stringify(req.body)}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // check if account exists
  console.log("mongoDB changes included");
  console.log("inside index.js file");
  if (!req.params.email.includes("@") || !req.params.email.includes(".")) {
    res.send("Error: Enter valid email id");
  }
  if (req.params.password.length < 8) {
    res.send("Error: Password must be 8 characters");
  }
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already exists");
      //res.sendStatus(403);
      res.send("User already exists");
    } else {
      // else create user
      dal
        .create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
          console.log(user);
          const accessToken = jwt.sign(
            { useremail: req.params.email, role: user.role },
            accessTokenSecret,
            { expiresIn: "20m" }
          );
          const refreshToken = jwt.sign(
            { useremail: req.params.email, role: user.role },
            refreshTokenSecret
          );
          refreshTokens.push(refreshToken);
          res.json({
            accessToken,
            refreshToken,
            user,
          });
        });
    }
  });
});

// login user
/*
app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});*/

app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        const accessToken = jwt.sign(
          { useremail: req.params.email, role: user.role },
          accessTokenSecret,
          { expiresIn: "20m" }
        );
        const refreshToken = jwt.sign(
          { useremail: req.params.email, role: user.role },
          refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.json({
          accessToken,
          refreshToken,
          user,
        });
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});
// find user account
app.get("/account/find/:email", authenticateJWT, function (req, res) {
  const { useremail, role } = req.user;
  if (useremail === req.params.email) {
    dal.find(req.params.email).then((user) => {
      console.log(user);
      res.send(user);
    });
  } else {
    res.sendStatus(403);
  }
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", authenticateJWT, function (req, res) {
  const { useremail, role } = req.user;

  if (useremail === req.params.email) {
    dal.findOne(req.params.email).then((user) => {
      console.log(user);
      res.send(user);
    });
  } else {
    res.sendStatus(403);
  }
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", authenticateJWT, function (req, res) {
  const { useremail, role } = req.user;
  //console.log("user", useremail);

  if (useremail === req.params.email) {
    var amount = Number(parseFloat(req.params.amount).toFixed(2));

    dal.update(req.params.email, amount).then((response) => {
      console.log(response);
      res.send(response);
    });
  } else {
    res.sendStatus(403);
  }
});

// all accounts
app.get("/account/all", authenticateJWT, function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Running on port: " + port);
