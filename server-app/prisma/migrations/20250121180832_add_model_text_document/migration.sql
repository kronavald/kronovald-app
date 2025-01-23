-- CreateTable
CREATE TABLE "TextDocument" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "TextDocument_pkey" PRIMARY KEY ("id")
);
