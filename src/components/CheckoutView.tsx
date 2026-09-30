"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { CreditCard, Lock, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { buttonStyles } from "./ui/Button";
import { cn, formatPrice } from "@/lib/utils";

const SHIPPING_FLAT = 6.9;
const TAX_RATE = 0.08;
const FREE_THRESHOLD = 49;

interface Fields {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const emptyFields: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  country: "United States",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

export function CheckoutView() {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useUI();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal === 0 || subtotal >= FREE_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const update =
    (key: keyof Fields) =>
    (e: { target: { value: string } }) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const validateShipping = (): boolean => {
    const next: Errors = {};
    if (!fields.firstName.trim()) next.firstName = "First name is required";
    if (!fields.lastName.trim()) next.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      next.email = "Enter a valid email";
    if (!fields.address.trim()) next.address = "Address is required";
    if (!fields.city.trim()) next.city = "City is required";
    if (!fields.zip.trim()) next.zip = "ZIP is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = (): boolean => {
    const next: Errors = {};
    if (!fields.cardName.trim()) next.cardName = "Name on card is required";
    if (fields.cardNumber.replace(/\s/g, "").length < 15)
      next.cardNumber = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(fields.expiry)) next.expiry = "Use MM/YY";
    if (!/^\d{3,4}$/.test(fields.cvc)) next.cvc = "3-4 digits";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;
    setPlaced(true);
    clearCart();
    toast({
      title: "Order placed successfully!",
      description: "This is a demo — no payment was processed.",
      variant: "success",
    });
  };

  if (placed) {
    const orderNo = Math.floor(100000 + Math.random() * 900000);
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-cream">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-charcoal">Order Placed!</h1>
        <p className="mt-3 text-muted">
          Thank you for shopping with Naturaa. Your order{" "}
          <span className="font-semibold text-charcoal">#NB-{orderNo}</span> is
          confirmed.
        </p>
        <p className="mt-1 text-sm text-muted">
          A confirmation email is on its way (demo).
        </p>
        <Link href="/shop" className={`${buttonStyles("primary", "lg")} mt-8`}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-charcoal">Nothing to check out</h1>
        <p className="mt-2 text-muted">Your cart is empty. Add a product to continue.</p>
        <Link href="/shop" className={`${buttonStyles("primary", "lg")} mt-8`}>
          Browse Products
        </Link>
      </div>
    );
  }

  const field = (
    key: keyof Fields,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label htmlFor={key} className="mb-1 block text-xs font-medium text-charcoal">
        {label}
      </label>
      <Input
        id={key}
        type={type}
        value={fields[key]}
        onChange={update(key)}
        placeholder={placeholder}
        className={cn(errors[key] && "border-peach focus-visible:ring-peach/30")}
      />
      {errors[key] ? <p className="mt-1 text-xs text-peach">{errors[key]}</p> : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-charcoal">Checkout</h1>

      <ol className="mt-6 flex items-center gap-3 text-sm">
        {["Shipping", "Payment"].map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full text-xs font-semibold",
                  active
                    ? "bg-primary text-cream"
                    : done
                      ? "bg-primary-light text-white"
                      : "bg-beige text-muted"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : n}
              </span>
              <span className={active ? "font-medium text-charcoal" : "text-muted"}>
                {label}
              </span>
              {n === 1 ? <ChevronRight className="h-4 w-4 text-muted" /> : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 1 ? (
            <section className="rounded-2xl border border-primary/10 bg-white p-6">
              <h2 className="font-serif text-xl text-charcoal">Shipping Address</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {field("firstName", "First Name", "text", "Jane")}
                {field("lastName", "Last Name", "text", "Doe")}
                {field("email", "Email", "email", "you@example.com")}
                {field("address", "Street Address", "text", "123 Greenway Ave")}
                {field("city", "City", "text", "San Francisco")}
                {field("zip", "ZIP Code", "text", "94107")}
                <div className="sm:col-span-2">
                  {field("country", "Country", "text", "United States")}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={() => validateShipping() && setStep(2)}>
                  Continue to Payment <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </section>
          ) : (
            <form
              onSubmit={handlePlaceOrder}
              className="rounded-2xl border border-primary/10 bg-white p-6"
              noValidate
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-charcoal">Payment Method</h2>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-beige/50 px-4 py-3 text-xs text-muted">
                <Lock className="h-4 w-4 text-primary" />
                Secure demo checkout — no real payment is processed.
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {field("cardName", "Name on Card", "text", "Jane Doe")}
                </div>
                <div className="sm:col-span-2">
                  {field("cardNumber", "Card Number", "text", "4242 4242 4242 4242")}
                </div>
                {field("expiry", "Expiry", "text", "MM/YY")}
                {field("cvc", "CVC", "text", "123")}
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full">
                <CreditCard className="h-4 w-4" /> Place Order · {formatPrice(total)}
              </Button>
            </form>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-primary/10 bg-white p-6">
            <h2 className="font-serif text-xl text-charcoal">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-beige/40">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-charcoal">{item.product.name}</p>
                    <p className="text-xs text-muted">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm text-charcoal">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <dl className="mt-5 space-y-2 border-t border-primary/10 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-charcoal">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-charcoal">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tax</dt>
                <dd className="text-charcoal">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-primary/10 pt-3">
                <dt className="font-semibold text-charcoal">Total</dt>
                <dd className="font-serif text-xl text-primary">{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
