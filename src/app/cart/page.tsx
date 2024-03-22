"use client";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import Image from "next/image";

const CartPage = () => {
  const { items, removeItem } = useCart();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p12":
                items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative h-40 w-40 mb-4 text-muted-foreground w-40"
                >
                  {" "}
                  <Image
                    src="/hippo-empty-cart.png"
                    alt="Empty cart"
                    fill
                    loading="eager"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
