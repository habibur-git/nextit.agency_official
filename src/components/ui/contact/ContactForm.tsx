"use client";

import { whatsappChatUrl } from "@/lib/whatsapp";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { GrSend } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import Button from "../../button/Button";

type ContactProps = {
  formColumnClassName?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PopupState =
  | null
  | { kind: "success" }
  | { kind: "error"; message: string; detail?: string };

const SUCCESS_WA_PREFILL =
  "Hi DevioNex! I just submitted the contact form on devionex.com. Looking forward to your reply.";

function errorWhatsappPrefill(mainMessage: string): string {
  const clipped =
    mainMessage.length > 240 ? `${mainMessage.slice(0, 237)}…` : mainMessage;
  return `Hi DevioNex! I tried the contact form on devionex.com but it didn’t send. ${clipped}\n\nCould we continue here?`;
}

function truncateDetail(s: string, max = 420): string {
  const t = s.trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

export default function Contact({
  formColumnClassName = "lg:col-span-8",
}: ContactProps) {
  const labelClass = "mb-3 block text-base font-medium text-title";

  const underlineInputClass =
    "h-12 w-full cursor-pointer border-b border-[#D1D5DB] bg-transparent text-base text-title transition-[border-color] duration-300 ease-out placeholder:text-sm placeholder:text-title/35 focus:cursor-text focus:border-title focus:outline-none";

  const selectSingleClass =
    "h-12 w-full cursor-pointer appearance-none border-b border-[#D1D5DB] bg-transparent pr-8 text-sm text-title/70 transition-[border-color] duration-300 ease-out focus:border-title focus:outline-none";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [message, setMessage] = useState("");

  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedHelpOptions, setSelectedHelpOptions] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    message?: string;
  }>({});

  const dismissPopup = () => setPopup(null);

  const successWhatsappHref = useMemo(
    () => whatsappChatUrl(SUCCESS_WA_PREFILL),
    [],
  );

  /** Always available on the form — opens WhatsApp to message the business. */
  const formFooterWhatsappHref = useMemo(
    () =>
      whatsappChatUrl("Hi DevioNex! I'd like to get in touch about a project."),
    [],
  );

  useEffect(() => {
    if (!popup) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [popup]);

  useEffect(() => {
    if (!popup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popup]);

  const helpOptionsDesign = [
    "Branding Solution",
    "Social Media Design",
    "Website Development",
    "E-Commerce Launch",
  ];

  const helpOptionsDevelopment = [
    ...helpOptionsDesign,
    "Full-Stack development",
    "Front end development",
  ];

  const hearAboutOptions = [
    "Clutch.co",
    "ChatGPT",
    "Google or Other Search Engine",
    "Perplexity",
    "Dribbble",
    "Behance",
    "Blog/Article",
    "LinkedIn",
    "Instagram",
    "Youtube",
    "Referral",
    "Twitter",
  ];

  const budgetOptions = ["$1K - $5K", "$5K - $10K", "$10K - $20K+"];

  const visibleHelpOptions =
    selectedServiceType === "Development"
      ? helpOptionsDevelopment
      : helpOptionsDesign;

  function validate(): boolean {
    const next: typeof fieldErrors = {};
    if (!fullName.trim()) next.fullName = "Please enter your name";
    if (!email.trim()) next.email = "Please enter your email";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email";
    if (!message.trim()) next.message = "Tell us about your project";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPopup(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim() || undefined,
          hearAbout: hearAbout.trim() || undefined,
          serviceType: selectedServiceType || undefined,
          helpOptions: selectedHelpOptions.length
            ? selectedHelpOptions
            : undefined,
          budget: selectedBudget || undefined,
          message: message.trim(),
        }),
      });

      const raw = await res.text();
      let data: {
        success?: boolean;
        message?: string;
        detail?: string;
      } = {};

      try {
        data = raw ? (JSON.parse(raw) as typeof data) : {};
      } catch {
        setPopup({
          kind: "error",
          message:
            "The server sent an unexpected response. Please try again in a moment or reach us on WhatsApp.",
          detail: res.status
            ? `HTTP ${res.status}${res.statusText ? ` ${res.statusText}` : ""}`
            : undefined,
        });
        return;
      }

      if (!res.ok || !data.success) {
        const detailRaw =
          typeof data.detail === "string" && data.detail.trim()
            ? truncateDetail(data.detail)
            : undefined;
        setPopup({
          kind: "error",
          message:
            data.message ??
            "Something went wrong sending your message. Try again or use WhatsApp below.",
          detail: detailRaw,
        });
        return;
      }

      setPopup({ kind: "success" });
      setFullName("");
      setEmail("");
      setWhatsapp("");
      setHearAbout("");
      setMessage("");
      setSelectedServiceType("");
      setSelectedHelpOptions([]);
      setSelectedBudget("");
      setFieldErrors({});
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : String(err);
      const isGenericFetch =
        rawMsg === "Failed to fetch" || rawMsg === "Load failed";
      setPopup({
        kind: "error",
        message:
          "We couldn’t reach the server. Check your internet connection and try again, or chat with us on WhatsApp.",
        detail: isGenericFetch ? undefined : truncateDetail(rawMsg),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={`rounded-3xl bg-bg p-12 ${formColumnClassName}`}>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="px-1">
              <label className={labelClass} htmlFor="contact-fullName">
                Full Name*
              </label>
              <input
                id="contact-fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  dismissPopup();
                  setFullName(e.target.value);
                  if (fieldErrors.fullName)
                    setFieldErrors((f) => ({ ...f, fullName: undefined }));
                }}
                placeholder="Enter your full name"
                autoComplete="name"
                className={`${underlineInputClass} ${fieldErrors.fullName ? "border-red-400" : ""}`}
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={
                  fieldErrors.fullName ? "contact-fullName-error" : undefined
                }
              />
              {fieldErrors.fullName && (
                <p
                  id="contact-fullName-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {fieldErrors.fullName}
                </p>
              )}
            </div>
            <div className="px-1">
              <label className={labelClass} htmlFor="contact-email">
                Email*
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  dismissPopup();
                  setEmail(e.target.value);
                  if (fieldErrors.email)
                    setFieldErrors((f) => ({ ...f, email: undefined }));
                }}
                placeholder="Enter your email"
                autoComplete="email"
                className={`${underlineInputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? "contact-email-error" : undefined
                }
              />
              {fieldErrors.email && (
                <p
                  id="contact-email-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="px-1">
              <label className={labelClass} htmlFor="contact-whatsapp">
                Whatsapp Number*
              </label>
              <input
                id="contact-whatsapp"
                name="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => {
                  dismissPopup();
                  setWhatsapp(e.target.value);
                }}
                placeholder="Enter Your Whats App Number"
                autoComplete="tel"
                className={underlineInputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-hearAbout">
                How did you hear about us?*
              </label>
              <div className="relative">
                <select
                  id="contact-hearAbout"
                  name="hearAbout"
                  value={hearAbout}
                  onChange={(e) => {
                    dismissPopup();
                    setHearAbout(e.target.value);
                  }}
                  className={selectSingleClass}
                >
                  <option value="">Choose an option</option>
                  {hearAboutOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-title/60">
                  <IoChevronDownOutline />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="px-1">
              <label className={labelClass} htmlFor="contact-serviceType">
                What services do you need?*
              </label>
              <div className="relative">
                <select
                  id="contact-serviceType"
                  name="serviceType"
                  value={selectedServiceType}
                  onChange={(e) => {
                    dismissPopup();
                    setSelectedServiceType(e.target.value);
                    setSelectedHelpOptions([]);
                  }}
                  className={selectSingleClass}
                >
                  <option value="">Choose an option</option>
                  {visibleHelpOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-title/60">
                  <IoChevronDownOutline />
                </span>
              </div>
            </div>
            <div className="px-1">
              <label className={labelClass} htmlFor="contact-budget">
                Project Budget*
              </label>
              <div className="relative">
                <select
                  id="contact-budget"
                  name="budget"
                  value={selectedBudget}
                  onChange={(e) => {
                    dismissPopup();
                    setSelectedBudget(e.target.value);
                  }}
                  className={selectSingleClass}
                >
                  <option value="">Choose an option</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-title/60">
                  <IoChevronDownOutline />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="contact-message">
              Tell us about your product and goals*
            </label>

            <textarea
              id="contact-message"
              name="message"
              rows={1}
              value={message}
              onChange={(e) => {
                dismissPopup();
                setMessage(e.target.value);
                if (fieldErrors.message)
                  setFieldErrors((f) => ({ ...f, message: undefined }));
              }}
              placeholder="Tell us about your product and goals."
              className={`w-full cursor-pointer resize-y border-b border-border bg-transparent py-3 text-base text-title transition-[border-color,box-shadow] duration-300 ease-out placeholder:text-sm placeholder:text-title/35 focus:cursor-text focus:border-title focus:outline-none ${
                fieldErrors.message ? "border-red-400" : ""
              }`}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={
                fieldErrors.message ? "contact-message-error" : undefined
              }
            />
            {fieldErrors.message && (
              <p
                id="contact-message-error"
                className="mt-1 text-sm text-red-600"
              >
                {fieldErrors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
            <Button
              type="submit"
              label="Send inquiry"
              variant="primary"
              size="md"
              icon={<GrSend className="text-[20px] text-theme" />}
              iconRotate={45}
              loading={loading}
              disabled={loading}
            />

            <div className="flex flex-col items-end gap-3 text-right text-base text-title">
              <p className="flex flex-col gap-1">
                <span className="text-sm">Prefer email?</span>
                <Link
                  href="mailto:info@nextit.agency"
                  className="cursor-pointer font-semibold text-title underline-offset-2 hover:underline"
                >
                  info@nextit.agency
                </Link>
              </p>
              <Link
                href={formFooterWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#128C7E] underline-offset-2 transition hover:underline"
                aria-label="Open WhatsApp to message DevioNex"
              >
                <IoLogoWhatsapp
                  className="h-5 w-5 shrink-0 text-[#25D366]"
                  aria-hidden
                />
                Message us on WhatsApp
              </Link>
            </div>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 z-200 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            aria-describedby={
              popup.kind === "error" && popup.detail
                ? "contact-popup-detail"
                : undefined
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 z-0 bg-black/45 backdrop-blur-[2px]"
              aria-label="Close dialog"
              onClick={dismissPopup}
            />
            <motion.div
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-black/5 bg-bg backdrop-blur-3xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div
                className={
                  popup.kind === "success"
                    ? "bg-bg px-8 pb-8 pt-10"
                    : "bg-linear-to-br from-red-50 to-white px-8 pb-8 pt-10"
                }
              >
                <div className="flex flex-col items-center text-center">
                  {popup.kind === "success" ? (
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
                    </div>
                  ) : (
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <XCircle className="h-9 w-9" strokeWidth={1.75} />
                    </div>
                  )}
                  <h2
                    id="contact-popup-title"
                    className="font-title text-xl font-semibold text-title md:text-2xl"
                  >
                    {popup.kind === "success"
                      ? "Message sent"
                      : "Couldn’t send"}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-desc md:text-base">
                    {popup.kind === "success"
                      ? "We typically respond within 24 hours. If you require an immediate response, please feel free to message or call us directly via WhatsApp"
                      : popup.message}
                  </p>
                  {popup.kind === "error" && popup.detail && (
                    <p
                      className="mt-3 max-h-28 w-full overflow-y-auto rounded-xl border border-black/5 bg-black/4 px-3 py-2 text-left text-xs leading-relaxed text-title/75"
                      id="contact-popup-detail"
                    >
                      <span className="font-medium text-title/90">
                        Details:{" "}
                      </span>
                      {popup.detail}
                    </p>
                  )}
                  {popup.kind === "success" ? (
                    <Link
                      href={successWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#20bd5a]"
                      aria-label="Open WhatsApp to message DevioNex"
                    >
                      <IoLogoWhatsapp
                        className="h-6 w-6 shrink-0"
                        aria-hidden
                      />
                      Chat on WhatsApp
                    </Link>
                  ) : (
                    <Link
                      href={whatsappChatUrl(
                        errorWhatsappPrefill(popup.message),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#20bd5a]"
                      aria-label="Open WhatsApp to message DevioNex"
                    >
                      <IoLogoWhatsapp
                        className="h-6 w-6 shrink-0"
                        aria-hidden
                      />
                      Chat on WhatsApp
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={dismissPopup}
                    className={`mt-3 w-full rounded-full border-2 py-3.5 text-base font-semibold transition cursor-pointer ${
                      popup.kind === "success"
                        ? " bg-body text-title hover:bg-theme/5"
                        : "bg-white text-title hover:bg-black/3"
                    }`}
                  >
                    {popup.kind === "success" ? "Done" : "Try again"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
