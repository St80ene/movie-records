import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Episode } from '../../episode/entity/episode.entity';

@Entity({ name: 'comments' })
export class Comment {
  constructor(props?: Partial<Comment>) {
    props && Object.assign(this, props);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250 })
  comment: string;

  @Column({ length: 30 })
  ipAddressLocation: string;

  @ManyToMany(() => Episode, (episode) => episode.comments, {
    onDelete: 'CASCADE',
  })
  episodes: Episode[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
