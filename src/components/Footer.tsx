import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const footerSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (footerRef.current) {
      // Footer entrance animation
      gsap.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered animation for footer sections
      const sections = footerSectionsRef.current.filter(Boolean);
      gsap.fromTo(
        sections,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Social links hover animation
      socialLinksRef.current.filter(Boolean).forEach((link) => {
        if (link) {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, {
              scale: 1.2,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          link.addEventListener("mouseleave", () => {
            gsap.to(link, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#f5f2e9] text-[#4F4F4D]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-[#4F4F4D]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div
            ref={(el) => {
              footerSectionsRef.current[0] = el;
            }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="The Gents Edit Logo"
                width={190}
                height={170}
                className="rounded-lg"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Your premier destination for sophisticated men&apos;s fashion. We
              curate the finest collections that blend style, comfort, and
              timeless elegance.
            </p>
            <div className="flex space-x-4">
              <Link
                ref={(el) => {
                  socialLinksRef.current[0] = el;
                }}
                href="#"
                className=" hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                ref={(el) => {
                  socialLinksRef.current[1] = el;
                }}
                href="#"
                className=" hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                ref={(el) => {
                  socialLinksRef.current[2] = el;
                }}
                href="#"
                className=" hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div
            ref={(el) => {
              footerSectionsRef.current[1] = el;
            }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold epunda-slab-medium">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/best-sellers"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div
            ref={(el) => {
              footerSectionsRef.current[2] = el;
            }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold epunda-slab-medium">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/exchange-policy"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Exchange Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className=" hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={16}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div
            ref={(el) => {
              footerSectionsRef.current[3] = el;
            }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold epunda-slab-medium">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-gray-400" />
                <span className=" text-sm">
                  123 Home Sweet Home
                  <br />
                  Greater Naveda , 201310
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <span className=" text-sm">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <span className=" text-sm">info@thegentsedit.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 The Gents Edit. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
