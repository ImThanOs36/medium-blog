/*
  Warnings:

  - The `authorId` column on the `Like` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "authorId",
ADD COLUMN     "authorId" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
