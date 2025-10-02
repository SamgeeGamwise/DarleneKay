const { DateTime } = require("luxon");

// src/_data/site.js
module.exports = {
  url: "https://darlenekay.com",
  site_name_painting: "Darlene Kay Painting",
  site_name_roofing: "Darlene Kay Roofing and Gutters",
  tagline: "Interior & exterior painting in the greater Denver area",
  nav: [
    { href: "/about", text: "About Us"  },
    { href: "/painting", text: "Painting", 
    //   children: [
    //   { href: "/painting/residential/interior", text: "Interior Home" },
    //   { href: "/painting/residential/exterior", text: "Exterior Home" },
    //   { href: "/painting/commercial/", text: "Commercial" },
    //   { href: "/painting/gallery/", text: "Gallery" },
    // ]
  },
    { href: "/roofing", text: "Roofing"},
    { text: "Additional Services", children: [
      { href: "/gutters", text: "Gutters" },
      { href: "/popcorn-removal", text: "Popcorn Removal" },
    ]},
    { href: "/contact/", text: "Contact" },
    // { href: "/testimonials/", text: "Testimonials" },
    // { href: "/news/", text: "News" },
  ],
  footer: [
    { href: "/", text: "Home"  },
    { href: "/about", text: "About Us"  },
    { href: "/roofing", text: "Roofing Services" },
    { href: "/painting", text: "Painting Service" },
    // { href: "/gallery/", text: "Gallery" },
    // { href: "/news/", text: "News" },
    { href: "/testimonials/", text: "Testimonials" },
    { href: "/contact", text: "Contact Us" },
    { href: "/careers", text: "Careers" }
  ],
  reviews: [
    { reviewer: "Dina E", stars: 5, source: "Google Review", link: "https://share.google/BN6OvaRRcBtMPIXoR", text: 'We had a wonderful experience hiring this company to paint several rooms in our townhome. The owners were knowledgeable and provided excellent customer service and the painters were very talented. The project was completed on time, and we couldn\'t be happier.' },
    { reviewer: "Seth H", source: "BBB Review", link: "https://www.bbb.org/us/co/aurora/profile/painting-contractors/darlene-kay-llc-1296-90246504/customer-reviews", stars: 5, text: 'Arrived on time, work completed as agreed. No surprises. Great communication. I didn\'t spend my days wondering if the contractor would show up on the job. Thank you for making my life easier.' },
    { reviewer: "Abhi", stars: 5, source: "Google Review", link: "https://share.google/whOs0ERvEKKXnYpw8", text: 'Great experience working with Roy to get our house exterior painted. Clear communications, great expectations setting and quick & on time job completion. The quality of the work was excellent and we are very happy.' },
    { reviewer: "William M", source: "BBB Review", link: "https://www.bbb.org/us/co/aurora/profile/painting-contractors/darlene-kay-llc-1296-90246504/customer-reviews", stars: 5, text: 'What a great company. They are the best in the business. I will give them 10 stars for their work, customer service, cost and completion of work in a timely manner. What a great group of people this company has. I will highly recommend them for your next paint job.' },
    { reviewer: "Philip T", source: "Google Review", link: "https://share.google/jNRc2eBUMlCqL9RFS", stars: 5, text: 'The project was handled with complete professionalism. They did exactly what work was quoted for exactly what was requested for that work. Very clean job site and the men were considerate and attentive to our needs. I would use these guys again and refer them to all my friends and neighbors - Thanks again guys.' },
    { reviewer: "Madeleine S", source: "BBB Review", link: "https://www.bbb.org/us/co/aurora/profile/painting-contractors/darlene-kay-llc-1296-90246504/customer-reviews", stars: 5, text: 'The Thomases are so kind, professional, and most importantly, amazingly skilled at what they do. They have so much integrity and will only offer the best quality, best advice, and best work. We just moved into a new house and they helped us matched existing paint and baseboards. Very clean lines, perfect color matching, texture matching, everything perfect. We will absolutely use them next time we need interior paint, and are planning on using them for exterior soon!' },
    { reviewer: "Russ W", source: "Google Review", link: "https://share.google/1pGYZVO4q6efmgtqz", stars: 5, text: 'Hands down the best painting company I’ve ever had the pleasure of working with. Roy and his crew did outstanding work painting the interior of our home. They showed up on time, left on time, and did high quality work. Roy is an outstanding communicator and made sure that we were happy with every detail of the job. I’ve hired this company on various occasions and always had a good experience.' },
  ],
  galleryImages: [
    { src: "/assets/images/Home5.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home6.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home7.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home9.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home13.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home14.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home15.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home19.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home20.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home21.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home22.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home23.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home24.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home26.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home27.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home28.webp", alt: "Darlene Kay Painting Project"},
    { src: "/assets/images/Home29.webp", alt: "Darlene Kay Painting Project"},
  ],
  year: new Date().getFullYear(),
  buildDate: DateTime.now().toISODate()
};
