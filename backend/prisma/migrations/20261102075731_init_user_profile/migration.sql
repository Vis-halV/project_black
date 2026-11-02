-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_clerkUserId_key" ON "UserProfile"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_username_key" ON "UserProfile"("username");

-- Username Constrain
ALTER TABLE "UserProfile"
ADD CONSTRAINT "UserProfile_username_format_check"
CHECK (
    char_length("username") BETWEEN 1 AND 30
    AND "username" ~ '^[a-z0-9._]+$'
    AND left("username", 1) <> '.'
    AND right("username", 1) <> '.'
    AND position('..' IN "username") = 0
);