-- CreateTable
CREATE TABLE "settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "carta_sections" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "note" TEXT,
    "isSalsas" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carta_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carta_dishes" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(8,2),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "isStar" BOOLEAN NOT NULL DEFAULT false,
    "isVeg" BOOLEAN NOT NULL DEFAULT false,
    "isSg" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carta_dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_menus" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "price" TEXT NOT NULL DEFAULT '16 €',
    "postre" TEXT NOT NULL DEFAULT 'Postre casero del día, fruta o café',
    "inclBread" BOOLEAN NOT NULL DEFAULT true,
    "inclDrink" BOOLEAN NOT NULL DEFAULT true,
    "inclCoffee" BOOLEAN NOT NULL DEFAULT false,
    "inclDessert" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_dishes" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isSupplement" BOOLEAN NOT NULL DEFAULT false,
    "suppPrice" TEXT,

    CONSTRAINT "daily_dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_images" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_menus_dayOfWeek_key" ON "daily_menus"("dayOfWeek");

-- CreateIndex
CREATE INDEX "reservations_date_idx" ON "reservations"("date");

-- CreateIndex
CREATE INDEX "reservations_status_idx" ON "reservations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "carta_dishes" ADD CONSTRAINT "carta_dishes_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "carta_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_dishes" ADD CONSTRAINT "daily_dishes_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "daily_menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
