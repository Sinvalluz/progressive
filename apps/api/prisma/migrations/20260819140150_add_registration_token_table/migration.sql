-- CreateTable
CREATE TABLE "RegistrationToken" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RegistrationToken_pkey" PRIMARY KEY ("id")
);
