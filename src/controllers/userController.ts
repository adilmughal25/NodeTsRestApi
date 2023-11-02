import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { config } from "dotenv";
config(); // Load environment variables from .env

// Access environment variables
const secretKey = process.env.SECRET_KEY || "default-secret";

class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await userModel.findOne({ email });
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Compare the provided password with the user's password as we are not encrypting the password.
      //It should be encrypted BTW but we are encrypting this in this case so comapring it with the DB Password.
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // If email and password match, you can consider the user as logged in and we will send the token along with the response message
      //Creating the Secret KEY

      let SECRET_KEY = secretKey;
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Login failed" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      // Create a new user instance using the UserModel
      const newUser = new userModel({
        email: req.body.email,
        password: req.body.password,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      const response = {
        user: {
          id: savedUser._id,
          email: savedUser.email,
        },
      };

      // Respond with the saved user
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create a new user" });
    }
  }

  async users(req: Request, res: Response) {
    try {
      //Finding all the users, we have in the DB and sending it in response.
      const users = await userModel.find();
      const response = users.map((user) => _.omit(user.toObject(), "__v"));
      res.json(response);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
}

export default new UserController();
