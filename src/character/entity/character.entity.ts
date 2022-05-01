import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'characters' })
export class Character {
  constructor(props?: Partial<Character>) {
    props && Object.assign(this, props);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ type: 'enum', enum: ['Dead', 'Alive', 'Unknown'] })
  status: string;

  @Column({ length: 50 })
  state_of_origin: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: string;

  @Column({ type: 'json' })
  episodes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
