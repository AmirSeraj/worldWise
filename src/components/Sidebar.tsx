import { Button, Image } from "@heroui/react";
import { Outlet } from "react-router";
import { Link, NavLink, useLocation } from "react-router";

export default function Sidebar() {
  const navigate = useLocation();
  const activeUrl = navigate.pathname.split("/")[2];
  return (
    <div className="h-full w-1/2">
      <div className="flex items-center flex-col w-full h-full sm:px-6 px-3 py-8 bg-slate-600">
        <NavLink to={"/"} className="items-center gap-2 sm:flex hidden">
          <Image src="/logo.png" width={185} />
        </NavLink>
        <div className="w-full flex mt-10 justify-center items-center">
          <Button
            as={Link}
            to="/app/cities"
            className="uppercase sm:text-base text-xs rounded-none"
            color={activeUrl === "cities" ? "primary" : "default"}
            variant="shadow"
          >
            cities
          </Button>
          <Button
            as={Link}
            to="/app/countries"
            className="uppercase sm:text-base text-xs rounded-none"
            color={activeUrl === "countries" ? "primary" : "default"}
            variant="shadow"
          >
            countries
          </Button>
        </div>

        <Outlet />

        <footer className="mt-auto w-full">
          <p className="text-gray-300 w-full text-center">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
            WorldWise Inc.
          </p>
        </footer>
      </div>
    </div>
  );
}
