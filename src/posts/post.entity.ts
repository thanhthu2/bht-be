import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  // eslint-disable-next-line prettier/prettier
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;
}
 
export default Post;