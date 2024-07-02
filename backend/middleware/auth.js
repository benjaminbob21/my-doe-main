import jwt from "jsonwebtoken";
import PropTypes from "prop-types";
import "dotenv/config";
/**
 * Middleware function to handle some request.
 * @param {import('express').Response} res - The response object. 
 */

export const jwtCheck = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });
};

jwtCheck.propTypes = {
    userId: PropTypes.string.isRequired
};

/**
 * Middleware function to handle some request.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').Request} req - The response object.
 * @param {import("express").NextFunction} next - The response object.
 * 
 */

export const verifyToken = (
  req,
  res,
  next
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    /**
 * Middleware function to handle some request.
 * @param {import("jsonwebtoken").JwtPayload} decoded - The response object.
 * 
 */
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

/**
 * Middleware function to handle some request.
 * @param {import('express').Response} res - The response object. 
 */
export const verifyLogout = (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
};