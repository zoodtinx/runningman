import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useSampleCarousel from "embla-carousel-react";

type PropType = {
   slides: number[];
   options?: EmblaOptionsType;
};

const SampleCarousel: React.FC<PropType> = (props) => {
   const { slides, options } = props;
   const [emblaRef, emblaApi] = useSampleCarousel(options, [Autoplay()]);

   return (
      <section className="embla w-full">
         <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
               {slides.map((index) => (
                  <div className="embla__slide" key={index}>
                     <div className="embla__slide__number bg-white/10 size-[310px]">
                        {index + 1}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default SampleCarousel;
