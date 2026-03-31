"use client";

import { useState } from "react";
import { useScrollVisible } from "@/hooks/useScrollVisible";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ContactResult {
  message: string;
}

import type { Dictionary } from "@/i18n";

export default function TrialForm({ t }: { t: Dictionary }) {
  const { ref, visible } = useScrollVisible();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ContactResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || t.trial.errorGeneric);
        return;
      }

      setResult(data);
    } catch {
      setError(t.trial.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <section id="contact" className="bg-gradient-to-br from-red-50 to-white py-24">
        <div className="mx-auto max-w-lg px-5 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">{t.trial.successTitle}</h2>
          <p className="mt-3 text-gray-600">{result.message}</p>
          <div className="mt-6 rounded-xl border border-red-200 bg-white p-5 text-sm text-gray-600">
            {t.trial.successNote} <strong>(+84) 0945 614 800</strong>.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#D71920]/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#D4A853]/10 blur-3xl" />

      <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""}`}>
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                {t.trial.title}
              </h2>
              <p className="mt-4 leading-relaxed text-gray-400">
                {t.trial.subtitle}
              </p>

              <div className="mt-10 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <svg className="h-5 w-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.trial.addressLabel}</p>
                    <p className="mt-1 text-sm text-gray-400">{t.trial.address}</p>
                  </div>
                </div>

                {/* Factory */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <svg className="h-5 w-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.trial.factoryLabel}</p>
                    <p className="mt-1 text-sm text-gray-400">{t.trial.factoryAddress}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <svg className="h-5 w-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Hotline</p>
                    <p className="mt-1 text-sm text-gray-400">(+84) 0945 614 800</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <svg className="h-5 w-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Email</p>
                    <p className="mt-1 text-sm text-gray-400">anmtt@tayafood.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-300">
                      {t.trial.labelName} <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.trial.placeholderName}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-300">
                      {t.trial.labelEmail} <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.trial.placeholderEmail}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-300">
                      {t.trial.labelPhone} <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={t.trial.placeholderPhone}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-300">
                      {t.trial.labelCompany} <span className="text-gray-500">{t.trial.labelCompanyOpt}</span>
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={t.trial.placeholderCompany}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    {t.trial.labelInterest}
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20 [&>option]:text-gray-900"
                  >
                    <option value="">—</option>
                    {t.trial.interestOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    {t.trial.labelMessage}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.trial.placeholderMessage}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20"
                  />
                </div>

                {error && (
                  <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full rounded-xl bg-[#D71920] py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#b9151b] disabled:opacity-60"
                >
                  {loading ? t.trial.submitting : t.trial.submit}
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  {t.trial.callDirect}{" "}
                  <span className="font-semibold text-[#D4A853]">(+84) 0945 614 800</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
