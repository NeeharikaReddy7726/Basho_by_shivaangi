"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VAPI_BASE } from "@/lib/api";
import { motion } from "framer-motion";

export default function MyExperiences() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return router.replace("/login?next=/profile/experiences");

    fetch(`${VAPI_BASE}/api/experiences/my-experiences/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(d => {
        setData(d.experiences || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6efe6]">
        <p className="font-serif text-[#5d2b14] text-lg animate-pulse">
          Preparing your clay rituals…
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6efe6] px-4 sm:px-6 py-20">

      {/* ambient light */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-[#c97c5d]/30 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[26rem] h-[26rem] bg-[#8c5a3c]/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] bg-[#4A5F55]/20 rounded-full blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="tracking-[0.45em] text-xs text-[#8c5a3c] mb-5">
            YOUR CLAY JOURNEY
          </p>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#5d2b14] mb-6 leading-tight">
            My Experiences
          </h1>

          <p className="text-[#4A5F55] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Moments shaped by hand, guided by earth, fire, and stillness.
            These are the rituals you’ve been part of.
          </p>
        </motion.div>

        {/* EMPTY */}
        {data.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-2xl border border-[#d6c6b6]/40 
                       rounded-[2.5rem] p-14 text-center shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)]"
          >
            <p className="font-serif text-2xl text-[#5d2b14] mb-4">
              No experiences yet
            </p>
            <p className="text-[#4A5F55] mb-8">
              When you join a ritual, its memory will live here.
            </p>
            <button
              onClick={() => router.push("/workshops")}
              className="px-10 py-3 rounded-full bg-gradient-to-br from-[#c97c5d] to-[#8c5a3c]
                         text-white tracking-wide shadow-xl hover:scale-105 transition"
            >
              Explore experiences
            </button>
          </motion.div>
        )}

        {/* EXPERIENCES */}
        <div className="grid md:grid-cols-2 gap-12">
          {data.map((e, index) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative bg-white/70 backdrop-blur-2xl border border-[#d6c6b6]/40 
                         rounded-[2.8rem] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)]
                         hover:shadow-[0_60px_160px_-60px_rgba(0,0,0,0.45)] transition overflow-hidden"
            >
              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c97c5d]/10 via-transparent to-[#4A5F55]/10 opacity-0 group-hover:opacity-100 transition" />

              <div className="relative p-8 sm:p-10">

                {/* top */}
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="tracking-[0.35em] text-xs text-[#8c5a3c] mb-2">
                      EXPERIENCE #{e.id}
                    </p>
                    <p className="text-2xl font-serif text-[#5d2b14] leading-snug">
                      Clay Ritual Session
                    </p>
                  </div>

                  <span className="px-5 py-2 rounded-full text-xs tracking-widest
                                   bg-[#c97c5d]/10 text-[#8c5a3c] border border-[#c97c5d]/30">
                    PAID
                  </span>
                </div>

                {/* info */}
                <div className="space-y-4 text-sm sm:text-base">
                  <div className="flex justify-between border-b border-[#d6c6b6]/30 pb-3">
                    <span className="text-[#4A5F55]">Amount</span>
                    <span className="font-serif text-[#5d2b14] text-lg">
                      ₹{e.amount}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-[#d6c6b6]/30 pb-3">
                    <span className="text-[#4A5F55]">Date</span>
                    <span className="text-[#5d2b14]">
                      {new Date(e.date).toDateString()}
                    </span>
                  </div>
                </div>

                {/* footer */}
                <div className="mt-10 text-xs tracking-[0.3em] text-[#8c5a3c]">
                  HANDCRAFTED • SLOW • INTENTIONAL
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BACK */}
        <div className="mt-24 text-center">
          <button
            onClick={() => router.push("/profile")}
            className="text-xs tracking-[0.4em] text-[#8c5a3c] hover:underline"
          >
            ← BACK TO PROFILE
          </button>
        </div>

      </div>
    </main>
  );
}
