import connection from "../../config/db.config";
import { User } from "../models/User";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          const users: User[] = results;
          resolve(users);
        }
      });
    });
  }

  static async createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const query ="INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
      const values = [user.username, user.password, user.email];
      
      connection.query(query, values, (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }
}
