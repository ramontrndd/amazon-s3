import connection from "../config/db.config";
import { User } from "../models/User";

/**
 * Representa um serviço de gerenciamento de usuários.
 */
export class UserService {
  /**
   * Recupera todos os usuários do banco de dados.
   * @returns Uma promessa que resolve um array de objetos User.
   */
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

  /**
   * Cria um novo usuário no banco de dados.
   * @param user – O objeto de usuário a ser criado.
   * @returns Uma promessa que resolve para o objeto User criado.
   */
  static async createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
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
