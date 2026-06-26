"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "./ScrollReveal";

export default function Testimonials() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [slidesCount, setSlidesCount] = useState(3);

  useEffect(() => {
    setMounted(true);
    
    // Explicitly handle window resize to bypass react-slick's buggy internal responsive array
    const handleResize = () => {
      if (window.innerWidth <= 1299) {
        setSlidesCount(1);
      } else {
        setSlidesCount(3);
      }
    };
    
    // Run once on mount
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: slidesCount > 1,
    centerPadding: slidesCount > 1 ? "20px" : "0px",
  };

  const testimonialsList = [
    {
      name: "Anjali M.",
      location: "Birmingham, UK",
      textKey: "campaign_testimonial1",
    },
    {
      name: "Raj P.",
      location: "London, UK",
      textKey: "campaign_testimonial2",
    },
    {
      name: "Simran K.",
      location: "Toronto, Canada",
      textKey: "campaign_testimonial3",
    },
    {
      name: "Hardeep S.",
      location: "Sydney, Australia",
      textKey: "campaign_testimonial4",
    },
  ];

  // We duplicate it to ensure the carousel has enough items to scroll smoothly
  const displayTestimonials = [...testimonialsList, ...testimonialsList];

  return (
    <ScrollReveal>
      <section className="max-w-425 w-full mx-auto px-4 sm:px-6 py-10 font-sans">
        <div className="bg-[#e5e6eb] rounded-xl p-8 sm:p-10">
          <div className="mb-10 text-center">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-4 py-1.5 rounded-full text-[12px] font-bold mb-4">
              {t.campaign_testimonials_badge || "TESTIMONIALS"}
            </span>
            <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#0a111e]">
              {t.campaign_testimonials_title || "What Our Customers Say"}
            </h2>
          </div>

          <div className="testimonial-carousel-container testimonial-carousel-light w-full min-h-[300px]">
            {mounted ? (
              <Slider {...sliderSettings}>
                {displayTestimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="testimonial-slide flex p-4 sm:p-6 items-center justify-center"
                  >
                    <div className="flex flex-col gap-0 px-5 py-6 sm:px-8 sm:py-8 rounded-2xl bg-white shadow-sm border border-black/5 mx-auto w-full md:max-w-xl min-h-[250px] sm:min-h-[200px]">
                      <span className="text-[32px] md:text-[40px] text-[#e77419] font-serif leading-none select-none">
                        &#x201C;&#x201C;
                      </span>
                      <p className="text-[14px] sm:text-[15px] text-[#666] leading-relaxed italic mb-4">
                        {t[testimonial.textKey as keyof typeof t]}
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
                          style={{ background: "#e77419" }}
                        >
                          {testimonial.name[0]}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[14px] font-bold text-[#0a111e]">
                            {testimonial.name}
                          </p>
                          <p className="text-[12px] text-[#666]">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : null}
          </div>

          <style jsx global>{`
            .testimonial-carousel-container {
              position: relative;
              overflow: hidden;
            }
            .testimonial-carousel-container::before,
            .testimonial-carousel-container::after {
              content: "";
              position: absolute;
              top: 0;
              width: 15%;
              height: 100%;
              z-index: 2;
              pointer-events: none;
            }
            .testimonial-carousel-light::before {
              left: 0;
              background: linear-gradient(
                to right,
                #e5e6eb,
                rgba(229, 230, 235, 0.9),
                rgba(229, 230, 235, 0)
              );
            }
            .testimonial-carousel-light::after {
              right: 0;
              background: linear-gradient(
                to left,
                #e5e6eb,
                rgba(229, 230, 235, 0.9),
                rgba(229, 230, 235, 0)
              );
            }
            .testimonial-slide {
              transition: all 0.5s ease;
              opacity: 0.5;
              transform: scale(0.9);
            }
            .slick-center .testimonial-slide {
              opacity: 1;
              transform: scale(1.05);
            }

            @media (max-width: 1299px) {
              .testimonial-carousel-container::before,
              .testimonial-carousel-container::after {
                display: none !important;
              }
              .testimonial-slide {
                opacity: 1 !important;
                transform: scale(1) !important;
                padding: 10px;
              }
            }
          `}</style>
        </div>
      </section>
    </ScrollReveal>
  );
}
