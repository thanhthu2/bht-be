import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GENDERS } from './enum';
 
@Entity()
class User {
 constructor(payload?: Partial<User>) {
        // super()
        Object.assign(this, payload)
    }
    
  @PrimaryGeneratedColumn('uuid')// eslint-disable-next-line prettier/prettier
  public id: string;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public firstName: string;
  

  @Column()
  public lastName: string;
 
  @Column()
  public password: string;

  @Column({ type: 'text', default: GENDERS.MALE })
  public gender: GENDERS

}
 
export default User;