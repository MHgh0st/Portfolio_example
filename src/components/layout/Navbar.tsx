"use client";
// import {
//   Navbar as HeroNavbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
// } from "@heroui/navbar";
import ThemeChanger from "../ThemeChanger";
import Menu from "../Menu";

const Navbar = () => {
  return (
    <>
      {/* <HeroNavbar
        maxWidth="full"
        className="pt-2"
        isBlurred={false}
        shouldHideOnScroll
      >
        <NavbarBrand className="text-3xl font-bold">هیـــــان</NavbarBrand>

        <NavbarContent justify="end" className="flex justify-start">
          <ThemeChanger />
          <Menu />
        </NavbarContent>
      </HeroNavbar> */}
      <nav className="fixed w-full top-0 z-50 min-h-22">
        <div className="mx-auto flex justify-between py-4 px-4">
          <p className="text-2xl font-bold">محمد حسین غلامی</p>
          <div className="flex justify-start space-x-4 w-28">
            <ThemeChanger />
            <Menu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
