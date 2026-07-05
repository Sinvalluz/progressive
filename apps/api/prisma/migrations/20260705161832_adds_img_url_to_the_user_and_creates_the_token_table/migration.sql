-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imgUrl" TEXT;

-- CreateTable
CREATE TABLE "RegistrationToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RegistrationToken_pkey" PRIMARY KEY ("id")
);
