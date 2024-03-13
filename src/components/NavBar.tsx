import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";

const NavBar = () => {
  const user = null;
  return (
    <div className="bf-white sticky top-0 z-50 inset-0 h-16">
      <header className="bg-white relative">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center  h-16">
              {/* TODO: Mobile navigation */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:space-x-6 lg:justify-end">
                  {user ? null : (
                    <Link
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                      href="/login"
                    >
                      Login
                    </Link>
                  )}
                  {user ? null : (
                    <span aria-hidden="true" className="h-6 w-px bg-muted" />
                  )}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      className={buttonVariants({
                        variant: "outline",
                      })}
                      href="/signup"
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? (
                    <span aria-hidden="true" className="h-6 w-px bg-muted" />
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span aria-hidden="true" className="h-6 w-px bg-muted" />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>{" "}
    </div>
  );
};

export default NavBar;
