import { Prisma } from "@prisma/client";
import prisma from "./prisma.js";
import ClientError from "../handler/ClientError.js";

// 1. Get a union of all model names like "User", "Store", etc.
export type ModelNames =
  (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

// 2. Get Prisma operation types for a given model (e.g. Store or User)
type PrismaOperations<ModelName extends ModelNames> =
  Prisma.TypeMap["model"][ModelName]["operations"];

// 3. Extract args used by `findMany` for that model (type-safe!)
type PrismaFindManyArgs<ModelName extends ModelNames> =
  PrismaOperations<ModelName>["findMany"]["args"];

// 4. Options passed into the paginate function
type PaginationOptions<ModelName extends ModelNames> = {
  modelName: ModelName;
  where?: PrismaFindManyArgs<ModelName>["where"];
  orderBy?: PrismaFindManyArgs<ModelName>["orderBy"];
  include?: PrismaFindManyArgs<ModelName>["include"];
  select?: PrismaFindManyArgs<ModelName>["select"]; // ✅ new
  page?: string;
  pageSize?: string;
};

// 5. The main paginate function
export default async function paginate<ModelName extends ModelNames>({
  modelName,
  where,
  orderBy,
  include,
  select, // ✅ receive select
  page,
  pageSize,
}: PaginationOptions<ModelName>) {
  try {
    const db = (prisma as any)[modelName];

    // No pagination = return all items
    if (!page || !pageSize) {
      const items = await db.findMany({
        where: where || {},
        orderBy: orderBy || { created_at: "asc" },
        include: include,
        select: select, // ✅ apply select
      });

      return {
        items,
        totalCount: items.length,
      };
    }

    const currentPage = parseInt(page, 10);
    const limit = parseInt(pageSize, 10);

    if (isNaN(currentPage) || isNaN(limit) || currentPage < 1 || limit < 1) {
      throw new ClientError("Invalid page or pageSize");
    }

    const skip = (currentPage - 1) * limit;

    const totalCount = await db.count({ where });

    const items = await db.findMany({
      where,
      orderBy: orderBy || { created_at: "asc" },
      include,
      select, // ✅ apply select
      skip,
      take: limit,
    });

    return {
      items,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage,
        pageSize: limit,
        hasNextPage: currentPage * limit < totalCount,
        hasPrevPage: currentPage > 1,
      },
    };
  } catch (error) {
    throw new ClientError("Failed to paginate data");
  }
}
