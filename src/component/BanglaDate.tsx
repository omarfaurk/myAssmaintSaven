"use client";

export default function BanglaDate() {
    const date = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
    });
    return <span suppressHydrationWarning>{date}</span>;
}