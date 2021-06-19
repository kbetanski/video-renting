import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  public constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
