import { Basics, Metadata } from '@reactive-resume/schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@/users/entities/user.entity';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.resumes, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'jsonb', default: {} })
  basics: Basics;

  @Column({ type: 'jsonb', default: {} })
  metadata: Metadata;

  @Column({ default: false })
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Resume>) {
    Object.assign(this, partial);
  }
}
