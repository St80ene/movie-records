import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Character } from '../../character/entity/character.entity';

@Entity({ name: 'locations' })
export class Location {
  constructor(props?: Partial<Location>) {
    props && Object.assign(this, props);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ type: 'double' })
  longitude: number;

  @OneToOne(() => Character, (character) => character.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
