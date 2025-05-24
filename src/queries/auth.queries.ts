import { UserCreate, userResponse } from "../types/user.schema.js";
import prisma from "./prisma.js";

const userResponseSelect = {
  id_user: true,
  name: true,
  email: true,
  username: true,
  photo_profile: true,
  deleted_at: true,
  created_at: true,
  updated_at: true,
};

class Auth {
  getUserById(id_user: string) {
    return prisma.user.findUnique({
      where: {
        id_user,
      },
    });
  }

  getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  createNewUser(user: UserCreate) {
    return prisma.user.create({
      data: user,
      //   select: userResponseSelect,
    });
  }
}

export default new Auth();
