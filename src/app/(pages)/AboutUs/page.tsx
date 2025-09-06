"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import rightSideImage from "../../../../public/RightSideImage.jpg";
import exchangeLogo from "../../../../public/exchangeLogo.png";
import returnLogo from "../../../../public/returnlogo.png";
import policyLogo from "../../../../public/policylogo.png";


export default function AboutUs() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#f5f2e9] py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl epunda-slab-medium text-gray-800 mb-6">
              About <span className="text-gray-600">The Gents Edit</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl epunda-slab-light mx-auto leading-relaxed">
              Where sophistication meets everyday wear. We believe that every
              gentleman deserves to look and feel his absolute best, whether
              he&apos;s heading to the office, a special event, or simply enjoying
              his day.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl epunda-slab-medium text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6 epunda-slab-light leading-relaxed">
                Founded with a passion for timeless style and modern
                sophistication, The Gents Edit emerged from a simple belief –
                that quality clothing should be accessible to every man who
                values both style and substance.
              </p>
              <p className="text-gray-600 mb-6 epunda-slab-light leading-relaxed">
                We curate collections that blend classic elegance with
                contemporary trends, ensuring that our customers always look
                polished and confident. From boardroom meetings to weekend
                adventures, we provide the perfect pieces for every occasion.
              </p>
              <p className="text-gray-600 epunda-slab-light leading-relaxed">
                Our commitment goes beyond just selling clothes – we&apos;re building
                a community of gentlemen who appreciate the finer things in life
                and aren&apos;t afraid to express their unique style.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={rightSideImage}
                alt="The Gents Edit Story"
                width={500}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl epunda-slab-medium text-gray-800 mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 epunda-slab-light max-w-3xl mx-auto">
              We&apos;re driven by core principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl epunda-slab-medium text-gray-800 mb-4">
                  Quality First
                </h3>
                <p className="text-gray-600 leading-relaxed epunda-slab-light">
                  We source only the finest materials and work with skilled
                  craftsmen to ensure every piece meets our high standards of
                  quality and durability.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl epunda-slab-medium text-gray-800 mb-4">
                  Timeless Style
                </h3>
                <p className="text-gray-600 leading-relaxed epunda-slab-light">
                  Our designs focus on classic silhouettes and versatile pieces
                  that won&apos;t go out of style, ensuring your wardrobe remains
                  relevant for years to come.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl epunda-slab-medium text-gray-800 mb-4">
                  Customer Care
                </h3>
                <p className="text-gray-600 leading-relaxed epunda-slab-light">
                  Your satisfaction is our priority. We provide exceptional
                  service, easy returns, and personalized styling advice to help
                  you look your best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Commitment Section */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl epunda-slab-medium text-gray-800 mb-6">
              Our Commitment to You
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={exchangeLogo}
                alt="Easy Exchange"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-2xl epunda-slab-medium text-gray-800 mb-3">
                Easy Exchange Policy
              </h3>
              <p className="text-gray-600 leading-relaxed epunda-slab-light">
                We offer hassle-free exchanging policy to ensure you get the
                perfect fit and style.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                src={returnLogo}
                alt="7 Days Return"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-2xl epunda-slab-medium text-gray-800 mb-3">
                7 Days Return Policy
              </h3>
              <p className="text-gray-600 leading-relaxed epunda-slab-light">
                We provide 7 days free return policy for your complete peace of
                mind.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                src={policyLogo}
                alt="Quality Policy"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-2xl epunda-slab-medium text-gray-800 mb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-600 leading-relaxed epunda-slab-light">
                Every piece is carefully inspected to meet our high standards of
                quality and craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-8 bg-[#f5f2e9]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl epunda-slab-medium text-gray-800 mb-6">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-xl epunda-slab-light text-gray-600 mb-8">
            Discover our curated collection of sophisticated menswear designed
            for the modern gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/collection"
              className="bg-gray-800 epunda-slab-light text-white px-8 py-3 rounded-lg epunda-slab-medium hover:bg-gray-700 transition-colors"
            >
              Explore Collection
            </a>
            <a
              href="/Contact"
              className="border-2 epunda-slab-light border-gray-800 text-gray-800 px-8 py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
