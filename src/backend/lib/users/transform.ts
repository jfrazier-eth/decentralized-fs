import { PGUser, User } from "./types";

export const transformPGUser = (pgUser: PGUser): User => {
  return {
    id: pgUser.id,
    username: pgUser.username,
    createdAt: pgUser.created_at,
  };
};

export const transformPGUsers = (pgUsers: PGUser[]): User[] => {
  return pgUsers.map(transformPGUser);
};

export const transformUser = (user: User): PGUser => {
  return {
    id: user.id,
    username: user.username,
    created_at: user.createdAt,
  };
};
