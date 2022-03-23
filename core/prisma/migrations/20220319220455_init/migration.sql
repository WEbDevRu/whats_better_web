-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "accessToken" VARCHAR(128) NOT NULL,
    "refreshToken" VARCHAR(128) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
