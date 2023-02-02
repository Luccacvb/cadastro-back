-- CreateTable
CREATE TABLE "Cadastro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT,
    "nascimento" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Cadastro_email_key" ON "Cadastro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cadastro_cpf_key" ON "Cadastro"("cpf");
