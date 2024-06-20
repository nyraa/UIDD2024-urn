-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Morgue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "golden_quote" TEXT NOT NULL,
    "cover_src" TEXT NOT NULL,
    "urn_index" INTEGER NOT NULL,
    "urn_texture_src" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "born_date" TEXT NOT NULL,
    "born_calendar" TEXT NOT NULL,
    "death_date" TEXT NOT NULL,
    "death_calendar" TEXT NOT NULL,
    "last_live_city" TEXT NOT NULL,
    "life_story" TEXT NOT NULL,
    CONSTRAINT "Morgue_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "promptId" TEXT NOT NULL,
    "death_story" TEXT NOT NULL,
    "person_features" TEXT NOT NULL,
    "memorial_activity" TEXT NOT NULL,
    "alive_family" TEXT NOT NULL,
    "dead_family" TEXT NOT NULL,
    "elementary_school" TEXT NOT NULL,
    "middle_school" TEXT NOT NULL,
    "high_school" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "graduate" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "hobby" TEXT NOT NULL,
    "volunteer" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    CONSTRAINT "Prompt_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Morgue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "morgueId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "Gallery_morgueId_fkey" FOREIGN KEY ("morgueId") REFERENCES "Morgue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
