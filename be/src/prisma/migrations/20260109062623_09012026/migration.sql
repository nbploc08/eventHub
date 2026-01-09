-- CreateTable
CREATE TABLE "emailOtps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emailOtps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "emailOtps_userId_idx" ON "emailOtps"("userId");

-- AddForeignKey
ALTER TABLE "emailOtps" ADD CONSTRAINT "emailOtps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
