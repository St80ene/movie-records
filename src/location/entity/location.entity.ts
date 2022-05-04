import { Comment } from '../../comment/entity/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
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

  @Column({ length: 50, default: '' })
  name: string;

  @Column({ type: 'double', default: 0 })
  latitude: number;

  @Column({ type: 'double', default: 0 })
  longitude: number;

  @OneToOne(() => Character, (character) => character.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @OneToMany(() => Comment, (comment) => comment.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
