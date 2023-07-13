import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  // eslint-disable-next-line prettier/prettier
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ default: 0 })
  public price: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}

export default Post;