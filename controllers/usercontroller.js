const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  let { firstName, lastName, password, sexuality, gender, pronouns } =
    req.body.user;
  try {
    const User = await UserModel.create({
      firstName,
      lastName,
      password: bcrypt.hashSync(password, 13),
      sexuality,
      gender,
      pronouns,
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: `${User.firstName} has been successfully signed up!`,
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: `Failed to register user. Error: ${err}`,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { firstName, lastName, password } = req.body.user;

  try {
    const loginUser = await UserModel.findOne({
      where: {
        firstName,
        lastName,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          user: loginUser,
          message: `${loginUser.user} successfully logged in!`,
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to log user in",
    });
  }
});
