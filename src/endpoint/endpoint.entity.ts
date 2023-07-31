import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusEndpoint, TypeEndpoint } from "./enum";


@Entity()
 export class Endpoint {
    constructor(payload?: Partial<Endpoint>) {
        // super()
        Object.assign(this, payload)
    }
  @PrimaryGeneratedColumn()
  // eslint-disable-next-line prettier/prettier
  public id: number;

  @Column()
  public domain: string;

  @Column({ type: 'text', default: TypeEndpoint.HTTP_HTTPS })
  public type: TypeEndpoint

  @Column({ type: 'text', default: StatusEndpoint.CREATED })
  public status: StatusEndpoint

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
