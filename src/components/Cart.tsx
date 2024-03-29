"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const [isMounted, setIsMounted] = useState<Boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const fee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="w-full flex flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            Cart items{" "}
            <span className="text-primary font-semibold">{itemCount}</span>
          </SheetTitle>{" "}
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex flex-col w-full pr-6">
              <ScrollArea className="h-[300px] ">
                {items.map(({ product }) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">transaction fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full items-center justify-center space-y-1">
            <div className="relative w-60 h-60 mb-4 text-muted-foreground ">
              <Image
                src="/hippo-empty-cart.png"
                alt="empty cart"
                fill
                aria-hidden={true}
              />
            </div>{" "}
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: " text-sm text-muted-foreground",
                })}
              >
                Add items to your cart
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
