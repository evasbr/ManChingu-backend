import prisma from "./prisma.js";

class ComicGenre {
  getAllComicGenre = async (comicId: string) => {
    return await prisma.comicGenre.findMany({
      where: {
        id_comic: comicId,
      },
    });
  };

  configureComicGenre = async (
    comicId: string,
    genreToCreate: string[],
    genreToDelete: string[]
  ) => {
    const createData = genreToCreate.map((c) => {
      return { id_comic: comicId, id_genre: c };
    });

    const data = await prisma.$transaction([
      prisma.comicGenre.createMany({
        data: createData,
      }),

      prisma.comicGenre.deleteMany({
        where: {
          id_comic: comicId,
          id_genre: {
            in: genreToDelete,
          },
        },
      }),
    ]);

    return data;
  };
}

export default new ComicGenre();
