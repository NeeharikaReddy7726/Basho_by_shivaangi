"use client";

import { useState } from "react";
import styles from "./ExperienceSection.module.css";

interface Props {
  experienceId: number; // ✅ added
  title: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  people: string;
  price: string;
  includes: string[];
  reverse?: boolean;
}

export default function ExperienceSection({
  experienceId,
  title,
  tagline,
  description,
  image,
  duration,
  people,
  price,
  includes,
  reverse = false,
}: Props) {
  const [open, setOpen] = useState(false);

  // ✅ form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  // ✅ submit handler (THIS is where fetch goes)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:8000/api/experiences/book/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experience: experienceId,
            full_name: name,
            phone: phone,
            email: email,
            booking_date: date,
            number_of_people: 2,
          }),
        }
      );

      if (!res.ok) throw new Error("Booking failed");

    alert("Booking successful 🎉");
    setOpen(false);
  } catch (err) {
    alert("Booking failed ❌");
  }
  };

  return (
    <>
      <section className={`${styles.section} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} />
        </div>

        <div className={styles.content}>
          <span className={styles.tagline}>♡ {tagline}</span>
          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>

          <div className={styles.meta}>
            <span>{duration}</span>
            <span>{people}</span>
            <span className={styles.price}>{price}</span>
          </div>

          <div className={styles.includes}>
            <h4>What’s Included:</h4>
            <ul>
              {includes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <button
            className={styles.button}
            onClick={() => setOpen(true)}
          >
            Book This Experience
          </button>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h3 className={styles.modalTitle}>Book Your Experience</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              {/* Experience already known */}
              <input type="text" value={title} disabled />

              <button type="submit" className={styles.submit}>
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
