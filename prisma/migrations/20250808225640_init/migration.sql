-- CreateTable
CREATE TABLE "public"."UploadData" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadData_pkey" PRIMARY KEY ("id")
);
