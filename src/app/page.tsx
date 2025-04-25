"use client"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div>
      <div className="mt-3 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={60} height={60} />
            <h1 className="font-bold text-4xl">Gen AI</h1>
          </div>
          <Button className="mr-4" onClick={() => router.push('/sign-in')}>Get Started</Button>
        </div>
        <hr className="bg-gray-500 mt-5" />
      </div>
      <div className="flex flex-col items-center justify-center mt-30 relative">
        <div className=" mt-26 absolute inset -z-10 flex h-[500px] w-full 
        items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
        </div>
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Introducing Gen AI
          </AnimatedGradientText>
          <ChevronRight
            className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </div>
        <h1 className="font-bold text-7xl">
          Your Personal&nbsp;
          <AuroraText>AI Assistant</AuroraText>
        </h1>
        <h2 className="font-bold mt-5">Are You ready for the future?</h2>
      </div>
    </div>
  );
}
