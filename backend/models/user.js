import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";

/**
 * @typedef {Object} UserType
 * @property {number} id
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * User model class
 * @extends {Model<UserType>}
 */
class User extends Model {}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);


export default User;
