import { Button, Image } from "@heroui/react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { isAuthenticated, user, handleLogout } = useAuth();
  return (
    <header className="flex w-full items-center justify-between md:px-14 sm:px-9 px-2 sticky top-0 h-[80px] shadow-lg bg-transparent z-50">
      <NavLink to={"/"} className="items-center gap-2 sm:flex hidden">
        <Image src="logo.png" width={185} />
      </NavLink>
      <div className="flex items-center sm:gap-5 gap-2 sm:text-base text-xs justify-end w-full">
        <NavLink to={"/"} className="text-black uppercase sm:hidden block">
          home
        </NavLink>
        <NavLink to={"/product"} className="text-black uppercase">
          product
        </NavLink>
        <NavLink to={"/pricing"} className="text-black uppercase">
          pricing
        </NavLink>
        {isAuthenticated ? (
          <div className="flex items-center gap-1">
            <p className="text-blue-500">{user?.name}</p>
            <Button onPress={handleLogout} color="default">
              Logout
            </Button>
          </div>
        ) : (
          <Button
            as={Link}
            to="/signin"
            className="uppercase sm:text-base text-xs"
            color="success"
          >
            log in
          </Button>
        )}
      </div>
    </header>
  );
}
