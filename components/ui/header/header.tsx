import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import HeaderButton from "./header-button";

type HeaderProps = {
  userName: string;
  avatarUrl: string;
  avatarFallback: string;
  alt: string;
  menu: string[];
};

export function Header({
  userName,
  avatarUrl,
  avatarFallback,
  alt,
  menu,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent w-[40px] p-0">
            <HeaderButton />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {menu.map((item, index) => (
            <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-2">
        <div>Olá, {userName}!</div>
        <Avatar>
          <AvatarImage src={avatarUrl} alt={alt} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
