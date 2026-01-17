"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { VAPI_BASE } from "@/lib/api";

type UserProfile = {
  username: string;
  email: string;
  full_name?: string;
  phone?: string;
  date_joined?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login?next=/profile");
      return;
    }

    fetch(`${VAPI_BASE}/api/accounts/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.clear();
          router.replace("/login");
          return;
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf6ee] to-[#f1e9df]">
        <p className="text-[#563a13] font-serif text-lg animate-pulse">
          Preparing your space…
        </p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#faf6ee] via-[#f3ede4] to-[#eee4d6] px-4 sm:px-6 py-16">

      {/* Clay light blobs */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-[#c97c5d]/25 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[30rem] h-[30rem] bg-[#8c5a3c]/25 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="tracking-[0.4em] text-xs text-[var(--basho-terracotta)] mb-4">
            YOUR STUDIO SPACE
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif text-[#5d2b14] mb-4">
            Welcome back, {user.full_name || user.username}
          </h1>

          <p className="text-[var(--basho-teal)] max-w-xl mx-auto">
            This is your personal corner at Basho — where your orders, workshops, 
            and experiences come together.
          </p>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-xl border border-[#c9b8a6]/40 rounded-[2rem] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.25)] p-6 sm:p-10"
        >

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c97c5d] to-[#8c5a3c]
                            flex items-center justify-center text-white text-4xl font-serif shadow-lg">
              {user.username?.[0]?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2b14]">
                {user.full_name || user.username}
              </h2>
              <p className="text-[var(--basho-teal)] mt-1">
                {user.email}
              </p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <Info label="Username" value={user.username} />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone || "Not added"} />
            <Info
              label="Joined"
              value={
                user.date_joined
                  ? new Date(user.date_joined).toDateString()
                  : "—"
              }
            />
          </div>

          {/* ACTIONS */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <ActionBtn onClick={() => router.push("profile/orders")}>
              My Orders
            </ActionBtn>

            <ActionBtn onClick={() => router.push("profile/workshops")}>
              My Workshops
            </ActionBtn>

            <ActionBtn onClick={() => router.push("profile/experiences")}>
              My Experiences
            </ActionBtn>
          </div>

          {/* LOGOUT */}
          <div className="pt-6 border-t border-[#c9b8a6]/40 text-center">
            <button
              onClick={() => {
                localStorage.clear();
                router.replace("/login");
              }}
              className="text-sm tracking-widest text-[#8B3A3A] hover:underline"
            >
              LOGOUT
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/60 rounded-xl px-5 py-4 border border-[#d8cbbd]/40">
      <p className="text-xs tracking-widest text-[#8c5a3c] mb-1">{label}</p>
      <p className="text-[#5d2b14] font-medium">{value}</p>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-4 rounded-xl bg-gradient-to-br from-[#c97c5d] to-[#8c5a3c]
                 text-white font-medium shadow-lg hover:shadow-2xl hover:scale-[1.03]
                 transition-all duration-300"
    >
      {children}
    </button>
  );
}
