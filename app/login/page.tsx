"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import RunningManLogo from "@/components/icons/RunningManLogo";
import { ArrowRightTag, ArrowUpLeft, NavArrowDown } from "iconoir-react";
import { GithubLogo } from "@/login/components/Github";
import Image from "next/image";

const Page = () => {
   const [isLoading, setisLoading] = useState(false);
   const featuresRef = useRef<HTMLDivElement>(null);

   if (isLoading) {
      return (
         <div className="w-full h-screen flex justify-center items-center bg-background text-primary">
            <div className="w-fit overflow-hidden">
               <RunningManLogo className="animate-slide overflow-hidden" />
            </div>
         </div>
      );
   }

   const signInWithProvider = async (provider: string) => {
      setisLoading(true);
      await signIn(provider);
   };

   const handleExploreFeatures = () => {
      if (featuresRef.current) {
         featuresRef.current.scrollIntoView({ behavior: "smooth" });
      }
   };

   const exportScreenshots = [
      "https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm4.webp?updatedAt=1755574977778",
      "https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm1.webp?updatedAt=1755574977758",
      "https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm3.webp?updatedAt=1755574977353",
      "https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm5.webp?updatedAt=1755574977434",
      "https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm2.webp?updatedAt=1755574977614",
   ];

   const imageCarousels = exportScreenshots.map((url) => (
      <div className="size-[310px]" key={url}>
         <Image
            src={url}
            alt=""
            className="object-cover"
            height={310}
            width={310}
         />
      </div>
   ));

   return (
      <div className="w-full h-screen flex justify-center items-center bg-background text-primary">
         <div className="w-full h-full">
            <div className="w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
               <div className="flex flex-col gap-2 w-[1200px]">
                  <div className="pt-[61px] h-screen w-full flex flex-col justify-between">
                     <div>
                        <div className="flex justify-between mb-[40px]">
                           <RunningManLogo className="w-[300px] h-auto" />
                           <button
                              onClick={(e) => {
                                 e.currentTarget.focus();
                                 signInWithProvider("credentials");
                              }}
                              className={
                                 "flex items-center text-[16px] bg-theme-good h-[30px] text-black px-2 rounded-[10px] font-headline uppercase font-semibold " +
                                 "focus:outline-none focus:ring-[1.5px] focus:ring-white focus:ring-offset-[2.5px] ring-offset-black"
                              }
                           >
                              <ArrowRightTag />
                              <p className="px-2">Launch Demo</p>
                           </button>
                        </div>
                        <div className="h-[440px] w-full mb-[20px] rounded-[12px] overflow-hidden">
                           <Image
                              src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-hero1-2.webp?updatedAt=1755578775229"
                              alt=""
                              className="w-full h-full"
                              height={0}
                              width={1200}
                           />
                        </div>
                        <div className="flex">
                           <div className="grow">
                              <div className="flex flex-col leading-tight font-headline text-[50px] mb-4 pt-5">
                                 <p>\ Check Conditions</p>
                                 <p>\ Track Runs</p>
                                 <p>\ Share Your Stats</p>
                              </div>
                              <p className="opacity-40">
                                 Check the air, plan your route, and log your
                                 runs. All in one sleek app.
                              </p>
                           </div>
                           <div className="h-[300px] w-[430px] bg-white/10 relative overflow-hidden rounded-[12px]">
                              <Image
                                 src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-hero2-2.webp?updatedAt=1755578775371"
                                 alt=""
                                 fill
                                 className="object-cover"
                              />
                           </div>
                        </div>
                     </div>
                     <button
                        className="pb-5 group w-fit mx-auto"
                        onClick={handleExploreFeatures}
                     >
                        <p className="uppercase text-center font-headline font-semibold">
                           Explore Features
                        </p>
                        <NavArrowDown className="mx-auto animate-shake" />
                     </button>
                  </div>
                  <div ref={featuresRef} className="w-full pt-[60px]">
                     <div className="flex justify-between w-full mb-[40px]">
                        <div className="w-[407px] h-[290px] relative">
                           <Image
                              src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-feat1.webp?updatedAt=1755574977476"
                              alt=""
                              fill
                              className="object-contain object-left"
                           />
                        </div>
                        <div className="flex flex-col items-end justify-between border-r border-r-white pr-[45px]">
                           <div className="font-headline text-[40px] leading-tight">
                              <p>Know the Air</p>
                              <p>Before The Run</p>
                           </div>
                           <p className="text-right w-[540px]">
                              Provides an overview of current weather, air
                              quality, and sun up/down times so you can plan
                              your run safely and comfortably.
                           </p>
                        </div>
                     </div>
                     <div className="border-b border-b-white mb-[40px]" />
                     <div className="flex justify-between w-full mb-[40px]">
                        <div className="flex flex-col justify-between border-l border-l-white pl-[45px]">
                           <div className="font-headline text-[40px] leading-tight">
                              <p>Know the Air</p>
                              <p>Before The Run</p>
                           </div>
                           <p className="w-[540px]">
                              Provides an overview of current weather, air
                              quality, and sun up/down times so you can plan
                              your run safely and comfortably.
                           </p>
                        </div>
                        <div className="w-[407px] h-[290px] relative">
                           <Image
                              src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-feat2.webp?updatedAt=1755574977637"
                              alt=""
                              fill
                              className="object-contain object-right"
                           />
                        </div>
                     </div>
                     <div className="border-b border-b-white mb-[40px]" />
                     <div className="flex flex-col items-center w-full mb-[70px]">
                        <p className="text-center font-headline text-[40px] leading-tight mb-[40px]">
                           Stylishly Export Stats
                        </p>
                        <div className="slider relative">
                           <div className="z-10 absolute h-full left-0 w-[200px] bg-gradient-to-r from-background to-transparent" />
                           <div className="z-10 absolute h-full right-0 w-[200px] bg-gradient-to-l from-background to-transparent" />
                           <div className="slide-track flex gap-6">
                              {imageCarousels}
                              {imageCarousels}
                              {imageCarousels}
                              {imageCarousels}
                              {imageCarousels}
                           </div>
                        </div>
                     </div>
                     <div className="border-b border-b-white mb-[40px]" />
                  </div>
                  <div className="bg-background p-[33px] rounded-2xl mb-[30px]">
                     <p className="text-center font-headline text-[40px] leading-tight mb-[30px]">
                        Tech Stack
                     </p>
                     <div className="flex gap-[23px] mb-[30px]">
                        <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                           <p className="px-3 py-2 text-[15px] text-primary/50 bg-primary/5 font-headline uppercase font-semibold text-center">
                              Client & Server
                           </p>
                           <div className="border-b border-primary/50" />
                           <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                              <div className="leading-tight">
                                 <p className="font-headline text-[30px] font-semibold text-center">
                                    Next.js
                                 </p>
                              </div>
                              <div className="border-b border-b-primary/20" />
                              <div>
                                 <p className="font-semibold">Libraries: </p>
                                 <p>
                                    Shadcn (Radix UI), Auth.js, Zod, Tailwind,
                                    Prisma
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                           <p className="px-3 py-2 text-[15px] text-primary/50 bg-primary/5 font-headline uppercase font-semibold text-center">
                              Infrastructure
                           </p>
                           <div className="border-b border-primary/50" />
                           <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                              <div className="leading-tight">
                                 <p className="font-headline text-[30px] font-semibold text-center">
                                    Railway
                                 </p>
                              </div>
                              <div className="border-b border-b-primary/20" />
                              <div>
                                 <p className="font-semibold">Services: </p>
                                 <p>
                                    Compute instance for server, PostgreSQL for
                                    database
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                           <p className="px-3 py-2 text-[15px] text-primary/50 bg-primary/5 font-headline font-semibold text-center">
                              3rd PARTY API
                           </p>
                           <div className="border-b border-primary/50" />
                           <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                              <div className="leading-tight">
                                 <p className="font-headline text-center text-[30px] font-semibold">
                                    Tomorrow.io
                                 </p>
                                 <p className="font-headline text-center text-[30px] font-semibold">
                                    IQAir
                                 </p>
                              </div>
                              <div className="border-b border-b-primary/20" />
                              <div>
                                 <p className="font-semibold">Usage: </p>
                                 <p>For weather-related raw information</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <button
                        className={
                           "flex items-center text-md bg-white/5 h-[34px] text-white mx-auto px-2 pr-3 gap-2 rounded-full " +
                           "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px] ring-offset-black"
                        }
                        onClick={(e) => e.currentTarget.focus()}
                     >
                        <GithubLogo className="size-[20px]" />
                        <span className="text-[16px] font-headline uppercase font-semibold">
                           See The Code
                        </span>
                     </button>
                  </div>
                  <div className="border-b border-b-white mb-[70px]" />
                  <div className="mb-[70px]">
                     <p className="text-center font-headline text-[40px] leading-tight mb-[15px]">
                        Explore Full Features
                     </p>
                     <button
                        onClick={(e) => {
                           e.currentTarget.focus();
                           signInWithProvider("credentials");
                        }}
                        className={
                           "flex items-center text-[16px] bg-theme-good h-[30px] text-black px-2 rounded-[10px] font-headline uppercase font-semibold mx-auto mb-[50px] " +
                           "focus:outline-none focus:ring-[1.5px] focus:ring-white focus:ring-offset-[2.5px] ring-offset-black"
                        }
                     >
                        <ArrowRightTag />
                        <p className="px-2">Launch Demo</p>
                     </button>
                     <div className="w-[440px] text-sm mx-auto border-t opacity-30 pt-4">
                        <p className="pb-4">
                           Each demo session is generated personally for each
                           user. Users are free to explore features, log runs,
                           add Routes, export stats, or delete content during
                           their session.
                        </p>
                        <p className="font-semibold">
                           All data will be automatically deleted 1 hour after
                           creation.
                        </p>
                     </div>
                  </div>
                  <div className="flex justify-between items-center text-[14px] px-3 w-full h-[33px] text-foreground bg-theme-good font-medium">
                     <button className="flex gap-1 items-center">
                        <ArrowUpLeft className="size-4" />
                        <p>See More Of My Portfolio Projects</p>
                     </button>
                     <p>© 2025 Peerapol Glaajing, All Rights Reserved.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Page;
