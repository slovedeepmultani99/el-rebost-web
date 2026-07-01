-- Migration: add multilingual (CA) fields
-- Run this in Supabase SQL Editor, then: npx prisma generate

ALTER TABLE carta_sections ADD COLUMN IF NOT EXISTS title_ca    TEXT;
ALTER TABLE carta_sections ADD COLUMN IF NOT EXISTS subtitle_ca TEXT;
ALTER TABLE carta_sections ADD COLUMN IF NOT EXISTS note_ca     TEXT;

ALTER TABLE carta_dishes ADD COLUMN IF NOT EXISTS name_ca        TEXT;
ALTER TABLE carta_dishes ADD COLUMN IF NOT EXISTS description_ca TEXT;

ALTER TABLE daily_dishes ADD COLUMN IF NOT EXISTS name_ca        TEXT;
ALTER TABLE daily_dishes ADD COLUMN IF NOT EXISTS description_ca TEXT;
