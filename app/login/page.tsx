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

   const headlines = ["Check Conditions", "Start Running", "Share Your Stats"];

   return (
      <div
         className={
            "w-full h-screen flex justify-center items-center bg-background text-primary"
         }
      >
         <div className="w-full h-full">
            <div
               className={
                  "w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden"
               }
            >
               <div className="flex flex-col gap-2 w-full xl:w-[1200px]">
                  <div
                     className={
                        "h-screen w-full flex flex-col justify-between lg:px-6 "
                     }
                  >
                     <div className="grow flex flex-col">
                        <div className="flex items-center justify-between px-3 pt-[12px] xl:pt-[35px] lg:pt-[18px] lg:px-0 ">
                           <RunningManLogo
                              className={
                                 "h-auto w-[170px] " +
                                 "md:w-[200px] " +
                                 "lg:w-[260px]"
                              }
                           />
                           <button
                              onClick={(e) => {
                                 e.currentTarget.focus();
                                 signInWithProvider("credentials");
                              }}
                              className={
                                 "flex items-center text-[12px] bg-theme-good h-[23px] text-black px-2 rounded-[7px] font-headline uppercase font-semibold " +
                                 "md:text-[14px] md:h-[26px] md:rounded-[10px] " +
                                 "lg:text-[16px] lg:h-[30px] " +
                                 "focus:outline-none focus:ring-[1.5px] focus:ring-white focus:ring-offset-[2.5px] ring-offset-black"
                              }
                           >
                              <ArrowRightTag className="hidden md:block" />
                              <p className="px-1 md:px-2">Launch Demo</p>
                           </button>
                        </div>
                        <div
                           className={
                              "grow px-3 md:px-4 lg:px-0 md:pt-0 animate-slide-up flex flex-col justify-center "
                           }
                        >
                           <div
                              className={
                                 "flex flex-col mb-3 lg:mt-6 " +
                                 "md:flex-row " +
                                 "lg:mb-6"
                              }
                           >
                              <div className="mb-4 lg:mb-0">
                                 <div
                                    className={
                                       "flex flex-col leading-tight font-headline text-[30px] mb-0 " +
                                       "md:text-[40px] " +
                                       "lg:text-[50px]"
                                    }
                                 >
                                    <div className=" flex flex-col leading-tight font-headline text-[30px] mb-4  lg:text-[40px] xl:text-[50px]">
                                       {headlines.map((text, i) => (
                                          <p key={i}>
                                             {text}&nbsp;
                                             <span className="text-theme-good">
                                                \
                                             </span>
                                          </p>
                                       ))}
                                    </div>
                                 </div>
                                 <p
                                    className={
                                       "text-white/60 text-sm md:pr-28 md:text-base"
                                    }
                                 >
                                    Plan your perfect run every time with
                                    RunningMan. Real-time environment updates,
                                    pre-calculated park routes, and flexible
                                    tracking for runners of all levels. And
                                    yeah, we make your post-run pics look fire
                                    too so you can stylishly show off.
                                 </p>
                              </div>
                              <div
                                 className={
                                    "hidden bg-white/10 relative overflow-hidden rounded-[12px] shrink-0 " +
                                    "lg:block md:h-[300px] md:w-[430px]"
                                 }
                              >
                                 <Image
                                    src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-hero2-2.webp?updatedAt=1755578775371"
                                    alt=""
                                    fill
                                    className="object-cover"
                                 />
                              </div>
                           </div>
                           <div
                              className={
                                 "h-fit w-full mb-[20px] rounded-[7px] overflow-hidden lg:mb-6 " +
                                 "md:h-[320px] " +
                                 "lg:h-[370px] md:rounded-[12px]"
                              }
                           >
                              <Image
                                 src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-hero1-2.webp?updatedAt=1755578775229"
                                 alt=""
                                 className="object-cover w-full h-full"
                                 height={0}
                                 width={1200}
                              />
                           </div>
                        </div>
                     </div>
                     <button
                        className="pb-2 lg:pb-5 group w-fit mx-auto"
                        onClick={handleExploreFeatures}
                     >
                        <p
                           className={
                              "uppercase text-center font-headline font-semibold text-sm " +
                              "md:text-base"
                           }
                        >
                           Explore Features
                        </p>
                        <NavArrowDown className="mx-auto animate-shake text-theme-good" />
                     </button>
                  </div>

                  {/* Features Section */}
                  <div
                     ref={featuresRef}
                     className="w-full pt-[60px] px-5 md:px-8"
                  >
                     <div
                        className={
                           "flex flex-col justify-between items-center w-full mb-[40px] border-r border-r-transparent md:border-r-theme-good " +
                           "md:flex-row md:items-start"
                        }
                     >
                        <div
                           className={
                              "w-[250px] h-[175px] relative shrink-0 mb-5 " +
                              "md:w-[407px] md:h-[290px] md:mb-0"
                           }
                        >
                           <Image
                              src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-feat1.webp?updatedAt=1755574977476"
                              alt=""
                              fill
                              className="object-contain object-left w-full h-full"
                           />
                        </div>
                        <div
                           className={
                              "flex flex-col items-end justify-between md:pr-[45px]"
                           }
                        >
                           <div
                              className={
                                 "font-headline pb-2 text-[30px] leading-tight text-center w-full " +
                                 "md:pb-0 md:w-fir md:text-right md:text-[40px]"
                              }
                           >
                              <p>Know the Air</p>
                              <p>Before The Run</p>
                           </div>
                           <p
                              className={
                                 "text-center px-5 md:px-0 md:text-right md:pl-10 md:w-auto lg:w-[540px]"
                              }
                           >
                              Get a quick look at your local air quality before
                              lacing up your running shoes. You&apos;ll know
                              exactly what the air&apos;s like outside and can
                              decide if it&apos;s a run day or a rest day.
                           </p>
                        </div>
                     </div>

                     <div className="border-b border-b-theme-good mb-[40px]" />

                     <div
                        className={
                           "flex flex-col justify-between items-center w-full mb-[40px] border-l border-l-transparent md:border-l-theme-good " +
                           "md:flex-row md:items-start"
                        }
                     >
                        <div
                           className={
                              "flex flex-col items-end justify-between border-l border-l-transparent order-2  md:pl-[45px] md:order-1"
                           }
                        >
                           <div
                              className={
                                 "font-headline pb-2 text-[30px] leading-tight text-center w-full " +
                                 "md:pb-0 md:w-fir md:text-left md:text-[40px]"
                              }
                           >
                              <p>Track Your Run</p>
                              <p>As You Remember It</p>
                           </div>
                           <p
                              className={
                                 "text-center px-5 md:px-0 md:text-left md:pr-10 md:w-auto lg:w-[540px]"
                              }
                           >
                              It&apos;s just you and your running journal. Log
                              your miles, times, routes, and how you felt with
                              simple manual entry that puts you in complete
                              control of your running data.
                           </p>
                        </div>
                        <div
                           className={
                              "w-[250px] h-[175px] relative shrink-0 mb-5 order-1 " +
                              "md:w-[407px] md:h-[290px] md:mb-0 md:order-2"
                           }
                        >
                           <Image
                              src="https://ik.imagekit.io/freelanceman/rnm-landingpage/rnm-feat2.webp?updatedAt=1755574977637"
                              alt=""
                              fill
                              className="object-contain object-center md:object-right"
                           />
                        </div>
                     </div>

                     <div className="border-b border-b-theme-good mb-[40px]" />

                     {/* Post Run Pic */}
                     <div
                        className={
                           "flex flex-col items-center w-full mb-[45px] h-[420px] " +
                           "lg:h-auto"
                        }
                     >
                        <p
                           className={
                              "text-center font-headline text-[30px] leading-tight mb-[27px] " +
                              "md:text-[40px] md:mb-[40px]"
                           }
                        >
                           Post-Run Pic Perfection
                        </p>
                        <div
                           className={
                              "slider relative mb-[27px] " + "md:mb-[40px]"
                           }
                        >
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
                        <p className={"px-5 text-center md:w-[560px] md:px-0"}>
                           Snap your post-run moments with curated designs that
                           match your run vibe. Whether you crushed a PR or just
                           enjoyed a chill jog. Make your manual log more
                           personal with pics that actually capture how each run
                           felt.
                        </p>
                     </div>

                     <div className="border-b border-b-theme-good mb-[40px]" />
                  </div>

                  {/* Tech Stack Section */}
                  <div className="bg-background p-[33px] py-0 md:py-[33px] rounded-2xl mb-[30px]">
                     <p
                        className={
                           "text-center font-headline text-[30px] leading-tight mb-[30px] " +
                           "md:text-[40px]"
                        }
                     >
                        Tech Stack
                     </p>
                     <div
                        className={
                           "flex flex-col gap-[23px] mb-[30px] " + "md:flex-row"
                        }
                     >
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
                           "flex items-center bg-white/5 h-[34px] text-md text-white mx-auto px-2 pr-3 gap-2 rounded-full " +
                           "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px] ring-offset-black"
                        }
                        onClick={(e) => {
                           e.currentTarget.focus();
                           window.open(
                              "https://github.com/zoodtinx/runningman",
                              "_blank",
                              "noopener,noreferrer"
                           );
                        }}
                     >
                        <GithubLogo className="size-[20px]" />
                        <span className="text-[16px] font-headline uppercase font-semibold">
                           See The Code
                        </span>
                     </button>
                  </div>

                  <div className="border-b border-b-theme-good mb-[70px] mx-5" />

                  {/* Full Features CTA */}
                  <div className="mb-[70px]">
                     <p
                        className={
                           "text-center font-headline text-[30px] leading-tight mb-[15px] " +
                           "md:text-[40px]"
                        }
                     >
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
                     <div className="w-[300px] md:w-[440px] text-sm mx-auto border-t opacity-30 pt-4">
                        <p className="pb-4">
                           Each demo session is generated personally for each
                           user. Users are free to explore features, log runs,
                           add Routes, export stats, or delete content during
                           their session.
                        </p>
                        <p className="font-semibold">
                           All data will be automatically deleted 2 hour after
                           creation.
                        </p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center text-[14px] px-3 w-full h-[33px] text-foreground bg-theme-good font-medium">
                     <a
                        href="https://www.peerapol.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-1 items-center"
                     >
                        <ArrowUpLeft className="size-4" />
                        <p>See More Of My Portfolio Projects</p>
                     </a>
                     <p className="hidden md:block">
                        © 2025 Peerapol Glaajing, All Rights Reserved.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Page;
