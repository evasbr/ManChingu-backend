import { UserCreate, userResponse } from "../types/user.schema.js";
import prisma from "./prisma.js";

const userResponseSelect = {
  id_user: true,
  email: true,
  username: true,
  //   deleted_at: true,
  //   created_at: true,
  //   updated_at: true,
};

class User {
  getUserById(id_user: string) {
    return prisma.user.findUnique({
      where: {
        id_user,
      },
      select: userResponseSelect,
    });
  }
}

export default new User();
