"use client";

import styles from "./Studio.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StudioPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsOpen(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };
  return (
   <main className={`${styles.page} ${styles.pageEnter}`}>


     
{/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image Motion */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/workshop-pieces/18.png"
            alt="Corporate pottery"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div className="relative z-10 text-white px-6">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-semibold mb-4"
          >
            OUR STUDIO
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl mx-auto text-white/80"
          >
            Where earth meets art — visit our creative sanctuary
          </motion.p>
        </div>
      </section>

      {/* LOCATION */}
      <section className={styles.section}>
        <div className={styles.grid}>

          {/* Map */}
<div className={styles.mapCard}>
  <iframe
    src="https://www.google.com/maps?q=21.1299866,72.7239895&z=17&output=embed"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  ></iframe>

  {/* Open in Google Maps */}
  <a
    href="https://www.google.com/maps/place/21%C2%B007'48.0%22N+72%C2%B043'26.4%22E"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.openMap}
  >
    Open in Google Maps
  </a>
</div>



          {/* Details */}
          <div className={styles.detailsCard}>
            <h3>Basho Pottery Studio</h3>
            <p>
              Near Dumas Road<br />
              Surat, Gujarat
            </p>

            <div className={styles.hours}>
              <p><strong>Mon–Fri:</strong> 10 AM – 7 PM</p>
              <p><strong>Sat:</strong> 10 AM – 5 PM</p>
              <p><strong>Sun:</strong> By appointment</p>
            </div>

            <button
  className={styles.primaryButton}
  onClick={() => setIsOpen(true)}
>
  Book a Studio Visit
</button>
          </div>
        </div>
      </section>

      {/* STUDIO POLICIES (side scroll like Upcoming Events) */}
      <section className={styles.altSection}>
        <h2 className={styles.sectionTitle}>Studio Policies</h2>

        <div className={styles.horizontalScroll}>
          {[
            ["Food-Safe Materials:", "Handcrafted using stoneware clay and finished with lead-free, food-safe glaze for everyday use."],
            ["Appliance Friendly:", "Oven, microwave, and dishwasher safe—made to fit seamlessly into modern kitchens."],
            ["Care Instructions:", "Dishwasher safe, but gentle handwashing is recommended. Clean lights and artifacts with a damp cloth."],
            ["Handmade & Unique:", "Each piece is lovingly handmade. Natural variations make every product one of a kind."],
          ].map(([title, desc]) => (
            <div key={title} className={styles.card}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

 {/* Upcoming events */}
<section className={styles.section}>
  <h2 className={styles.sectionTitle}>Upcoming Events</h2>

  <div className={styles.horizontalScroll}>
    
    <div className={styles.card}>
      <span className={styles.badge}>✨ Upcoming</span>
      <h3>Weekend Pottery Fair</h3>

      <div className={styles.eventMeta}>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📅</span>
          <span>January 15–16, 2025</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📍</span>
          <span>Basho Studio, Surat</span>
        </div>
      </div>

      <p>
        Browse our latest collections and meet the artisans behind each piece.
      </p>
    </div>

    <div className={styles.card}>
      <span className={styles.badge}>✨ Upcoming</span>
      <h3>Ceramic Art Exhibition</h3>

      <div className={styles.eventMeta}>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📅</span>
          <span>February 5–10, 2025</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📍</span>
          <span>Art Gallery, Ahmedabad</span>
        </div>
      </div>

      <p>
        A curated showcase of Japanese-inspired pottery featuring wabi-sabi
        aesthetics.
      </p>
    </div>

    <div className={styles.card}>
      <span className={styles.badge}>✨ Upcoming</span>
      <h3>Farmer’s Market Pop-up</h3>

      <div className={styles.eventMeta}>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📅</span>
          <span>Every Sunday</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📍</span>
          <span>Organic Farmer’s Market, Surat</span>
        </div>
      </div>

      <p>
        Find our handcrafted pieces at the weekly farmer’s market.
      </p>
    </div>

    <div className={styles.card}>
      <span className={styles.badge}>✨ Upcoming</span>
      <h3>Clay & Calm Workshop</h3>

      <div className={styles.eventMeta}>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📅</span>
          <span>March 2</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.icon}>📍</span>
          <span>Basho Studio</span>
        </div>
      </div>

      <p>
        A mindful pottery workshop focused on slow craft and calm creation.
      </p>
    </div>

  </div>
</section>


      {/* PAST EXHIBITIONS */}
<section className={styles.altSection}>
  <h2 className={styles.sectionTitle}>Past Exhibitions</h2>

  <div className={styles.gridThree}>
    <div className={styles.exhibitionCard}>
      <img
        src="/Images/products/25.png"
        alt="Wabi-Sabi Exhibition"
      />
      <h3>Wabi-Sabi · Mumbai</h3>
    </div>

    <div className={styles.exhibitionCard}>
      <img
        src="/Images/products/26.png"
        alt="Earth & Fire Exhibition"
      />
      <h3>Earth & Fire · Pune</h3>
    </div>

    <div className={styles.exhibitionCard}>
      <img
        src="/Images/products/27.png"
        alt="Handmade India Exhibition"
      />
      <h3>Handmade India · Delhi</h3>
    </div>
  </div>
</section>

 {/* BOOKING MODAL */}
{isOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      
      {/* Cancel */}
      <button
        className={styles.closeButton}
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      >
        ✕
      </button>

      <h3 className={styles.modalTitle}>Book a Studio Visit</h3>

      <form onSubmit={handleBookingSubmit} className={styles.form}>
        <label>
          Your Name
          <input
            type="text"
            placeholder="e.g. Lily Sharma"
            required
          />
        </label>

        <label>
          Contact Number
          <input
            type="tel"
            placeholder="We’ll use this to confirm"
            required
          />
        </label>

        <div className={styles.row}>
          <label>
            Visit Date
            <input type="date" required />
          </label>

          <label>
            Time Slot
            <select required>
              <option value="">Select</option>
              <option>Morning (10–1)</option>
              <option>Afternoon (1–4)</option>
              <option>Evening (4–7)</option>
            </select>
          </label>
        </div>

        <button type="submit" className={styles.primaryButton}>
          Confirm Booking
        </button>
      </form>
    </div>
  </div>
)}


{/* SUCCESS MESSAGE */}
{isSuccess && (
  <div className={styles.successToast}>
    <span>✓</span>
    <p>Your studio visit is booked.<br />We’ll contact you shortly.</p>
  </div>
)}

    </main>
  );
}
