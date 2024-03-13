"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Catogrey = (typeof PRODUCT_CATEGORIES)[number];
interface NavItemProps {
  category: Catogrey;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ category, handleOpen, isOpen, isAnyOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      <div className="">
        {isOpen ? (
          <div
            className={cn(
              "absolute inset-x-0 top-full text-sm text-muted-foreground ",
              {
                "animate-in fade-in-10 slide-in-from-top-5": isAnyOpen,
              }
            )}
          >
            <div
              className="absolute inset-0 top-1/2 bg-white shadow"
              aria-hidden={true}
            />
            <div className="relative bg-white">
              <div className="mx-auto max-w-7xl px-8 ">
                <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                  <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                    {category.featured.map((item) => (
                      <div
                        key={item.name}
                        className="group relative text-base sm:text-sm"
                      >
                        <div className="relative aspect-video group-hover:opacity-75  bg-gray-100 overflow-hidden rounded-lg">
                          <Image
                            src={item.imageSrc}
                            className="object-cover origin-center"
                            alt="product category image"
                            fill
                          />
                        </div>
                        <Link
                          className="mt-6  block font-medium text-gray-900"
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                        <p aria-hidden={true} className="mt-1 text-gray-500">
                          Shop Now
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavItem;
