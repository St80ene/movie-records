import { Location } from 'src/location/entity/location.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @Column({ length: 30, default: '' })
  ipAddressLocation: string;

  @ManyToOne(() => Episode, (episode) => episode.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

  @ManyToOne(() => Location, (location) => location.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
