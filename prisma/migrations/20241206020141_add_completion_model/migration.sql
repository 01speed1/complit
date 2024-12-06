-- CreateTable
CREATE TABLE "Completion" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "completion_date" TIMESTAMP(3) NOT NULL,
    "proof_url" TEXT NOT NULL,
    "proof_image" TEXT NOT NULL,

    CONSTRAINT "Completion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Completion" ADD CONSTRAINT "Completion_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
