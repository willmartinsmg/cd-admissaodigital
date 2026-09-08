ALTER TABLE "candidato"
  ADD COLUMN "deficiente" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "preenche_cota_deficiencia" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "tipo_aposentadoria" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "data_aposentadoria" DATE;
