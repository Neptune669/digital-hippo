import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Key } from "lucide-react";
import ProductReel from "@/components/ProductReel";
const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your digital asset delivered in seconds and Download it right away",
  },
  {
    name: "Granted Quality",
    Icon: CheckCircle,
    description: "We ensure the highest quality of your digital assets",
  },
  {
    name: "Secured",
    Icon: Key,
    description: "We ensure your digital assets are secure with our encryption",
  },
];

export default function Home() {
  return (
    <>
      {" "}
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high quality{" "}
            <span className="text-primary">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose  text-muted-foreground">
            welcome to Digital Hippo every asset on our platform is verified by
            our team to ensure the highest quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link className={buttonVariants({ size: "lg" })} href="/products">
              Browse Trending
            </Link>
            <Button variant="outline">Our quality promise &rarr;</Button>
          </div>
        </div>
        <ProductReel
          title="Trending Products"
          subtitle="Trending products"
          href="/products"
          query={{ sort: "desc", limit: 4 }}
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
