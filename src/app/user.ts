import { Repository } from './repository'

export class User {
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  public_repos: number;
  followers: number;
  created_at: Date;
  repositories: Repository[];
}