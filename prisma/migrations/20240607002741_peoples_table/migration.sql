-- CreateTable
CREATE TABLE "peoples" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "cns" TEXT NOT NULL,

    CONSTRAINT "peoples_pkey" PRIMARY KEY ("id")
);
