import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insertUser(userData: any) {
    const hashedPassword = await this.hashPassword(userData.password);
    return this.databaseService.insert(
      'user',
      [
        'name',
        'surname',
        'email',
        'password',
        'phone',
        'age',
        'country',
        'district',
        'role',
      ],
      [
        userData.name,
        userData.surname,
        userData.email,
        hashedPassword,
        userData.phone,
        userData.age,
        userData.country,
        userData.district,
        userData.role,
      ],
    );
  }

  async getAllUsers(
    page: number = 1,
    pageSize: number = 10,
    search: string = '',
  ) {
    const offset = (page - 1) * pageSize;
    const users = await this.databaseService.getAll(
      'user',
      pageSize,
      offset,
      search,
    );
    const totalCount = await this.databaseService.getCount('user', search);
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      totalCount,
      totalPages,
      page,
      pageSize,
      users,
    };
  }

  async getUserById(id: number) {
    return this.databaseService.getById('user', id);
  }

  async updateUserById(userData: any) {
    return this.databaseService.updateById(
      'user',
      userData.id,
      [
        'name',
        'surname',
        'email',
        'password',
        'phone',
        'age',
        'country',
        'district',
        'role',
        'updated_at',
      ],
      [
        userData.name,
        userData.surname,
        userData.email,
        userData.password,
        userData.phone,
        userData.age,
        userData.country,
        userData.district,
        userData.role,
        new Date().toISOString(),
      ],
    );
  }

  async deleteUserById(id: number) {
    return this.databaseService.deleteById('user', id);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
