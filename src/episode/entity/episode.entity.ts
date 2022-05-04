import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Character } from '../../character/entity/character.entity';
import { Comment } from '../../comment/entity/comment.entity';

@Entity({ name: 'episodes' })
export class Episode {
  constructor(props?: Partial<Episode>) {
    props && Object.assign(this, props);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 30 })
  episode_comments: string;

  @Column({ length: 30 })
  episode_code: string;

  @Column({ length: 30 })
  release_date: string;

  @ManyToMany(() => Character, (character) => character.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  characters: Character[];

  @ManyToMany(() => Comment, (comment) => comment.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
