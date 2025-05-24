import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  company?: string;
  rating?: number;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, company, rating = 5, delay }) => {
  return (
    <div
      className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-industry-700 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-industry-900">{author}</p>
        {company && <p className="text-sm text-industry-500">{company}</p>}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const earlyFeedback = [
    {
      quote: "We're on a mission to redefine how industries source electrical and hardware components — faster, smarter, and with purpose.",
      author: "Founders of Shyama Ventures",
      delay: 100,
    },
    {
      quote: "Our startup is built on the idea that small innovations lead to big industrial transformations.",
      author: "Product Team",
      delay: 200,
    },
    {
      quote: "We believe in creating reliable, accessible solutions tailored to the needs of modern industry.",
      author: "Vision Statement",
      delay: 300,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-industry-900 mb-4">What Drives Us Forward</h2>
          <p className="text-lg text-industry-700 max-w-2xl mx-auto">
            As a new startup, our story is just beginning — but our purpose is clear. Here’s what inspires and motivates our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {earlyFeedback.map((item, index) => (
            <Testimonial
              key={index}
              quote={item.quote}
              author={item.author}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
