-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'card',
    "change" TEXT NOT NULL DEFAULT '00,00',
    "orderId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
