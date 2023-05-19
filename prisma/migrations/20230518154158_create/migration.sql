/*
  Warnings:

  - Added the required column `group` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Group" AS ENUM ('MouseAndKeyboard', 'Cpu', 'Gpu', 'MotherBoard', 'Case');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "group" "Group" NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
