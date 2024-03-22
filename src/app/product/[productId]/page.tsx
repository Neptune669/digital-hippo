import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });
  const [product] = products;
  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;
  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <section aria-labelledby="information-heading" className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>
                <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground ">
                  {label}
                </div>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-600"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  instant delivery
                </p>
              </div>
            </section>
          </div>
          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:self-center  lg:mt-0">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
          </div>
          {/* add to cart */}
          <div className="mt-10 lg:col-start-1 lg:row-sp-2 lg:max-w-lg lg:mt-0">
            <div className="">
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm font-medium">
                  <Shield className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-primary mr-2" />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Rerun Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductReel
        title={`similar ${label}`}
        subtitle={`Browse similar high quality ${label} just like ${product.name}`}
        href="/products"
        query={{ category: product.category, limit: 4 }}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
