import { getServerSession } from "next-auth";
import { db } from "../../_lib/prisma";
import { authOptions } from "../../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../../_components/header";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
      address: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="hidden lg:block">
        <Header isInput />
      </div>

      <div className="px-5 py-6">
        <h2 className="pb-6 text-sm font-semibold md:text-lg">Meus Pedidos</h2>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="font-medium">Você ainda não realizou nenhum pedido!</p>
        )}
      </div>
    </>
  );
};

export default MyOrdersPage;
