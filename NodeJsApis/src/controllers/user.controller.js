import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { user } from "../models/user.model.js";
import { Connection } from "../db/connection.js";
dotenv.config();

const userRepository = Connection.getRepository(user);

// Registration
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, city, country } = req.body;

    if (!name || !email || !password || !role || !phone || !city || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof name !== "string" || name.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    if (role !== "admin" && role !== "user") {
      return res
        .status(400)
        .json({ message: "Role must be either 'Admin' or 'Staff'" });
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (typeof city !== "string" || !city.trim()) {
      return res.status(400).json({ message: "City is required" });
    }
    if (typeof country !== "string" || !country.trim()) {
      return res.status(400).json({ message: "Country is required" });
    }

    const existing = await userRepository.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      city,
      country,
    });

    await userRepository.save(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ message: "Login successful", token });
};

// List All users
export const listusers = async (req, res) => {
  const currentuser = req.user;
  if (currentuser.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  const { search, country } = req.query;
  const query = userRepository.createQueryBuilder("user");

  if (search)
    query.andWhere("user.name LIKE :search OR user.email LIKE :search", {
      search: `%${search}%`,
    });
  if (country) query.andWhere("user.country = :country", { country });

  const users = await query.getMany();
  res.status(200).json(users);
};

// Get user Details
export const currentUser = async (req, res) => {
  try {
    const currentuser = req.user;

    const user = await userRepository.findOne({
      where: { id: currentuser.id },
    });
    if (!user) return res.status(404).json({ message: "user not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "error fetching user :", error });
  }
};

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Access denied: Admins only" });

    const users = await userRepository.find();

    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
