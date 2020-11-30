import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ unique: true })
  public username: string

  @Column({ select: false })
  public password: string

  @Column({ unique: true })
  public email: string
}
