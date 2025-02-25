import { cn } from "@/app/_lib/utils";

interface Props {
  passStrength: number;
  className?: string;
}

export default function PasswordStrength({ passStrength, className }: Props) {
  return (
    <div className={cn("flex w-full gap-2", className)}>
      {Array.from({ length: passStrength + 1 }).map((_i, index) => (
        <div
          key={index}
          className={cn("h-1 w-full rounded-md", {
            "bg-red-500": passStrength === 0,
            "bg-orange-500": passStrength === 1,
            "bg-yellow-500": passStrength === 2,
            "bg-green-500": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
}
