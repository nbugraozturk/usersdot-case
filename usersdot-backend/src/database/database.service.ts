import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';

dotenv.config();

@Injectable()
export class DatabaseService {
  private static clientData = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };
  private client: Client;

  constructor() {
    this.client = new Client(DatabaseService.clientData);
    this.initializeDatabase().then(async () => {
      await this.connectDatabase();
      if (!(await this.checkTableExists())) {
        await this.createUsersTable();
        await this.insertMockData();
      }
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async initializeDatabase() {
    try {
      await this.client.connect();
      const res = await this.client.query(
        `SELECT FROM pg_database WHERE datname = '${process.env.DATABASE_NAME}'`,
      );

      if (res.rowCount === 0) {
        await this.client.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);
        console.log(`Database '${process.env.DATABASE_NAME}' created`);
      } else {
        console.log(`Database '${process.env.DATABASE_NAME}' already exists`);
      }
    } catch (err) {
      console.error('Error initializing database', err);
    } finally {
      await this.client.end();
    }
  }

  private async connectDatabase() {
    try {
      this.client = new Client({
        ...DatabaseService.clientData,
        database: process.env.DATABASE_NAME,
      });
      await this.client.connect();
      console.log('Db conected');
    } catch (err) {
      console.error('Error connecting database', err);
    }
  }

  private async checkTableExists() {
    const tableCheckQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'user'
    );
  `;
    const tableCheckResult = await this.client.query(tableCheckQuery);

    return tableCheckResult.rows[0].exists;
  }

  private async createUsersTable() {
    const createTableQuery = `
    CREATE TABLE "user" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      surname VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      age INT CHECK (age >= 0),
      country VARCHAR(100),
      district VARCHAR(100),
      role VARCHAR(10) CHECK (role IN ('ADMIN', 'USER')) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT NULL
    );
  `;

    await this.client.query(createTableQuery);
    console.log('Users table created');
  }

  private async insertMockData() {
    const dataFilePath = path.join(__dirname, '../../mock-users.json');
    const mockUsers = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    for (const user of mockUsers) {
      const insertQuery = `
        INSERT INTO "user" 
        (name, surname, email, password, phone, age, country, district, role) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      const hashedPassword = await this.hashPassword(user.password);
      await this.client.query(insertQuery, [
        user.name,
        user.surname,
        user.email,
        hashedPassword,
        user.phone,
        user.age,
        user.country,
        user.district,
        user.role,
      ]);
    }

    console.log('Mock data inserted into users table');
  }

  async insert(table: string, columns: string[], values: any[]) {
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO "${table}" (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    try {
      const result = await this.client.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getAll(table: string, limit: number, offset: number, search: string) {
    const searchQuery = search
      ? `WHERE name ILIKE $3 OR
       surname ILIKE $3 OR
        email ILIKE $3 OR
         phone ILIKE $3 OR
           country ILIKE $3 OR
            district ILIKE $3 OR
             role ILIKE $3`
      : '';
    const query = `SELECT * FROM "${table}" ${searchQuery} LIMIT $1 OFFSET $2`;
    const result = await this.client.query(
      query,
      search ? [limit, offset, `%${search}%`] : [limit, offset],
    );
    return result.rows;
  }

  async getById(table: string, id: number) {
    const query = `SELECT * FROM "${table}" WHERE id = $1`;
    const result = await this.client.query(query, [id]);
    return result.rows[0];
  }

  async updateById(
    table: string,
    id: number,
    columns: string[],
    values: any[],
  ) {
    const setters = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');
    const query = `UPDATE "${table}" SET ${setters} WHERE id = $${columns.length + 1} RETURNING *`;
    try {
      const result = await this.client.query(query, [...values, id]);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async deleteById(table: string, id: number) {
    const query = `DELETE FROM "${table}" WHERE id = $1 RETURNING *`;
    const result = await this.client.query(query, [id]);
    return result.rows[0];
  }

  async getCount(table: string, search: string) {
    const searchQuery = search
      ? `WHERE name ILIKE $1 OR
       surname ILIKE $1 OR
        email ILIKE $1 OR
         phone ILIKE $1 OR
           country ILIKE $1 OR
            district ILIKE $1 OR
             role ILIKE $1`
      : '';
    const query = `SELECT COUNT(*) FROM "${table}" ${searchQuery}`;
    const result = await this.client.query(
      query,
      search ? [`%${search}%`] : [],
    );
    return parseInt(result.rows[0].count, 10);
  }
}
