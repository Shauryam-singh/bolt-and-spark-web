
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
  rating: number;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, company, rating, delay }) => {
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
      <p className="text-industry-700 mb-4 italic">{quote}</p>
      <div>
        <p className="font-semibold text-industry-900">{author}</p>
        <p className="text-sm text-industry-500">{company}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "BoltWorks has been our go-to supplier for fasteners for over 5 years. Their quality is consistent and delivery always on time.",
      author: "Michael Johnson",
      company: "Precision Engineering Co.",
      rating: 5,
      delay: 100,
    },
    {
      quote: "The switch boards we sourced from BoltWorks have proven to be reliable and durable. Their technical support team is also very knowledgeable.",
      author: "Sarah Williams",
      company: "Modern Constructions Ltd.",
      rating: 5,
      delay: 200,
    },
    {
      quote: "We've never had an issue with quality or delivery times. Their bulk ordering system has streamlined our procurement process.",
      author: "David Chen",
      company: "Global Manufacturing Inc.",
      rating: 4,
      delay: 300,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-industry-900 mb-4 reveal">What Our Clients Say</h2>
          <p className="text-lg text-industry-700 max-w-2xl mx-auto reveal">
            Don't just take our word for it. Here's what our clients have to say about working with BoltWorks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              company={testimonial.company}
              rating={testimonial.rating}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
