import prisma from "./prisma.js";

class Comic {
  getAllGenre = async () => {
    return await prisma.genre.findMany();
  };

  addGenre = async (name: string) => {
    return await prisma.genre.create({
      data: {
        name,
      },
    });
  };

  deleteGenre = async (genreId: string) => {
    return await prisma.genre.delete({
      where: {
        id_genre: genreId,
      },
    });
  };

  searchGenreByName = async (name: string) => {
    return await prisma.genre.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  };
}

export default new Comic();
