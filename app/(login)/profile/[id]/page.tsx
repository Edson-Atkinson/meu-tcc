import { db } from "@/app/_lib/prisma";
import Image from "next/image";
interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({
  params: { id },
}: ProfilePageProps) {
  const user = await db.user.findUnique({
    where: { id },
  });

  return (
    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Meu perfil
      </h1>
      <span
        className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
        style={{
          display: "inline-block",
          verticalAlign: "top",
          textDecoration: "inherit",
        }}
      >
        Gerencie as configurações e preferências do seu perfil.
      </span>

      <div className="flex items-center justify-center">
        <div className=" mt-9 grid grid-cols-2">
          <p>Nome:</p>
          <p>{user?.name ?? user?.username}</p>
          <p>Nome de usuário:</p>
          <p>{user?.username}</p>
          <p>Email:</p>
          <p>{user?.email}</p>

          <p>imagem:</p>
          {user?.image ? (
            <Image
              width={200}
              height={200}
              src={user?.image!}
              alt="imagem do usuário"
            />
          ) : (
            <p>Sem imagem!</p>
          )}
          <p>{user?.image}</p>
        </div>
      </div>
    </section>
  );
}
