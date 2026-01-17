"use client";

import { useEffect, useState } from "react";
import { VAPI_BASE } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login?next=/profile/orders");
      return;
    }

    fetch(`${VAPI_BASE}/api/orders/my-orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6efe6]">
        <p className="font-serif text-[#5d2b14] text-lg animate-pulse">
          Gathering your handcrafted pieces…
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6efe6] px-4 sm:px-6 py-20">

      {/* ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-[#c97c5d]/30 rounded-full blur-[140px]" />
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
            YOUR POTTERY JOURNEY
          </p>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#5d2b14] mb-6 leading-tight">
            Orders & Creations
          </h1>

          <p className="text-[#4A5F55] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Each piece you collect carries the warmth of the kiln, the mark of hands,
            and a story that continues in your space.
          </p>
        </motion.div>

        {/* EMPTY */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-2xl border border-[#d6c6b6]/40 
                       rounded-[2.5rem] p-14 text-center shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)]"
          >
            <p className="font-serif text-2xl text-[#5d2b14] mb-4">
              No pieces yet
            </p>
            <p className="text-[#4A5F55] mb-8">
              When you choose your first creation, it will live here.
            </p>
            <button
              onClick={() => router.push("/shop")}
              className="px-10 py-3 rounded-full bg-gradient-to-br from-[#c97c5d] to-[#8c5a3c]
                         text-white tracking-wide shadow-xl hover:scale-105 transition"
            >
              Discover the collection
            </button>
          </motion.div>
        )}

        {/* ORDERS */}
        <div className="space-y-14">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="group bg-white/70 backdrop-blur-2xl border border-[#d6c6b6]/40 
                         rounded-[2.8rem] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)]
                         hover:shadow-[0_60px_160px_-60px_rgba(0,0,0,0.45)] transition overflow-hidden"
            >
              {/* HEADER */}
              <div className="relative p-6 sm:p-10 border-b border-[#d6c6b6]/40">

                <div className="absolute inset-0 bg-gradient-to-r from-[#c97c5d]/10 via-transparent to-[#4A5F55]/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="tracking-[0.35em] text-xs text-[#8c5a3c] mb-2">
                      ORDER #{order.id}
                    </p>
                    <p className="text-xl sm:text-2xl font-serif text-[#5d2b14]">
                      {new Date(order.created_at).toDateString()}
                    </p>
                  </div>

                  <span className="self-start sm:self-auto px-5 py-2 rounded-full text-xs tracking-widest
                                   bg-[#c97c5d]/10 text-[#8c5a3c] border border-[#c97c5d]/30">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* BODY */}
              <div className="p-6 sm:p-10 grid xl:grid-cols-[2fr_1fr] gap-10">

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm sm:text-base
                                 border-b border-[#d6c6b6]/30 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-[#5d2b14] font-medium">
                        {item.name} × {item.qty}
                      </span>
                      <span className="text-[#4A5F55]">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* SUMMARY */}
                <div className="relative bg-gradient-to-br from-[#f7f0e8] to-[#efe5d8] rounded-2xl 
                                p-6 sm:p-8 border border-[#d6c6b6]/50 h-fit">

                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#c97c5d]/20 rounded-full blur-2xl" />

                  <p className="tracking-[0.35em] text-xs text-[#8c5a3c] mb-4">
                    ORDER TOTAL
                  </p>

                  <p className="text-3xl sm:text-4xl font-serif text-[#5d2b14] mb-2">
                    ₹{order.total}
                  </p>

                  <p className="text-xs text-[#4A5F55]">
                    Taxes & packaging included
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BACK */}
        <div className="mt-20 text-center">
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
