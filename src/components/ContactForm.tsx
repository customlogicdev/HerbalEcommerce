"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const textareaClass =
  "min-h-[130px] w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-charcoal shadow-sm transition placeholder:text-muted/60 focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25";

export function ContactForm() {
  const { toast } = useUI();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update =
    (key: keyof FormState) =>
    (e: { target: { value: string } }) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (form.message.trim().length < 10) next.message = "Please enter at least 10 characters";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      toast({ title: "Please fix the highlighted fields", variant: "warning" });
      return;
    }

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
      variant: "success",
    });
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-charcoal">
            Name
          </label>
          <Input
            id="contact-name"
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Doe"
            className={cn(errors.name && "border-peach focus-visible:ring-peach/30")}
          />
          {errors.name ? <p className="mt-1 text-xs text-peach">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-charcoal">
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={cn(errors.email && "border-peach focus-visible:ring-peach/30")}
          />
          {errors.email ? <p className="mt-1 text-xs text-peach">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-xs font-medium text-charcoal">
          Subject
        </label>
        <Input
          id="contact-subject"
          value={form.subject}
          onChange={update("subject")}
          placeholder="How can we help?"
          className={cn(errors.subject && "border-peach focus-visible:ring-peach/30")}
        />
        {errors.subject ? <p className="mt-1 text-xs text-peach">{errors.subject}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-charcoal">
          Message
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us a little more..."
          className={cn(textareaClass, errors.message && "border-peach focus-visible:ring-peach/30")}
        />
        {errors.message ? <p className="mt-1 text-xs text-peach">{errors.message}</p> : null}
      </div>

      <Button type="submit" size="lg">
        <Send className="h-4 w-4" /> Send Message
      </Button>
    </form>
  );
}
