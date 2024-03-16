import VerifyEmail from "@/components/Verify-email";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="items-center justify-center container relative flex-col pt-20 lg:px-0 flex">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 size-60 text-muted-foreground ">
              <Image src="/hippo-email-sent.png" fill alt="hippo-sent-email" />
            </div>

            <h3 className="text-2xl font-semibold"> Check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center ">
                we&apos;ve sent an email to{" "}
                <span className="text-primary">{toEmail}</span> with a link to
                verify your email.
              </p>
            ) : (
              <p className="text-muted-foreground text-center ">
                we&apos;ve sent Verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
