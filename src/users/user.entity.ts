import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public username: string

  @Column({ select: false })
  public password: string

  @Column()
  public email: string
}
