-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Новое', 'В_работе', 'Завершено', 'Отменено');

-- CreateTable
CREATE TABLE "Addressing" (
    "id" SERIAL NOT NULL,
    "addressing" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Новое',
    "cancellation_message" TEXT NOT NULL,
    "solving_problem" TEXT NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "Addressing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addressing" ADD CONSTRAINT "Addressing_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
