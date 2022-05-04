import { Location } from '../../location/entity/location.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Episode } from '../../episode/entity/episode.entity';

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

  @ManyToOne(() => Episode, (episode) => episode.characters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'episode_id' })
  episodes: Episode[];

  @OneToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
