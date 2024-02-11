/*
  Warnings:

  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `label` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "label" VARCHAR(50) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);
