import {
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export interface TrustBadge {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export const trustBadges: TrustBadge[] = [
  { icon: Leaf, title: "Natural Ingredients", subtitle: "Safe for your hair & scalp" },
  { icon: ShieldCheck, title: "Dermatologically Tested", subtitle: "Gentle yet effective" },
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $49" },
  { icon: Heart, title: "Loved by 50K+", subtitle: "Real people. Real results." },
  { icon: Sparkles, title: "Cruelty-Free", subtitle: "Never tested on animals" },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping Policy", href: "/contact" },
      { label: "Returns & Refunds", href: "/contact" },
      { label: "FAQs", href: "/contact" },
      { label: "Track Order", href: "/account" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Our Ingredients", href: "/about" },
      { label: "Our Values", href: "/about" },
      { label: "Sustainability", href: "/about" },
    ],
  },
];

export const contactInfo = {
  email: "hello@naturaa.com",
  phone: "+1 (555) 123-4567",
  address: "123 Greenway Ave, San Francisco, CA 94107",
};

export const announcementText =
  "FREE SHIPPING ON ORDERS OVER $49  |  USE CODE: GLOW20";
