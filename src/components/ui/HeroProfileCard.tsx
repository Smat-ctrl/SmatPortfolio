"use client";

import { heroCardBody, heroCardHeader, heroCardShell } from "@/lib/card-styles";
import { siteConfig } from "@/data/site";
import { motion, useReducedMotion } from "@/lib/animations";
import Image from "next/image";
import { useState } from "react";

function ProfileMedia({
  src,
  alt,
  variant,
}: {
  src: string;
  alt: string;
  variant: "coffee" | "cooking";
}) {
  const shouldReduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`profile-media profile-media--${variant} relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-beige bg-steamed shadow-warm sm:h-[4.5rem] sm:w-[5.5rem]`}
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="88px"
          className={`object-cover ${shouldReduceMotion ? "" : "profile-media-image"}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-caramel/30 to-toasted/40 text-lg">
          {variant === "coffee" ? "☕" : "🍳"}
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-steamed/10"
        aria-hidden="true"
      />
      {variant === "coffee" && !shouldReduceMotion && !failed && (
        <div
          className="profile-steam pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function ProfileRow({
  label,
  children,
  media,
}: {
  label: string;
  children: React.ReactNode;
  media: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-beige/80 bg-steamed/60 p-3 sm:gap-4">
      {media}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-wider text-caramel">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-medium text-espresso sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function HeroProfileCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: 12 }}
      animate={shouldReduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
      className={heroCardShell}
    >
      <div className={heroCardHeader}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-caramel">
            Profile
          </p>
          <p className="font-mono text-[10px] text-mocha">profile.card</p>
        </div>
      </div>

      <div className={`${heroCardBody} justify-between gap-4`}>
        <div className="flex items-center gap-4 border-b border-beige/80 pb-4">
          <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
            <div
              className="absolute -inset-1 rounded-full bg-gradient-to-br from-caramel/35 to-toasted/25 blur-sm"
              aria-hidden="true"
            />
            <Image
              src="/avatar.png"
              alt={`${siteConfig.name} avatar`}
              fill
              unoptimized
              priority
              sizes="96px"
              className="rounded-full border-[3px] border-steamed object-cover shadow-warm"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-caramel">
              profile.init()
            </p>
            <p className="mt-1 font-serif text-lg text-espresso sm:text-xl">
              Builder · Ideator · Problem Solver
            </p>
            <p className="mt-1 text-sm text-mocha">
              Shipping useful software worth using.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3">
          <ProfileRow
            label="Profile.FunFact()"
            media={
              <ProfileMedia
                src="/coffee-media.jpg"
                alt="Latte and coffee"
                variant="coffee"
              />
            }
          >
            <span className="inline-flex items-center gap-1.5">
              I <span className="text-caramel">♥</span> coffee ☕
            </span>
          </ProfileRow>

          <ProfileRow
            label="Profile.Hobbies()"
            media={
              <ProfileMedia
                src="/cooking-media.jpg"
                alt="Cooking in the kitchen"
                variant="cooking"
              />
            }
          >
            Cooking
          </ProfileRow>
        </div>
      </div>
    </motion.div>
  );
}
