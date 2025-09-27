import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "This groundbreaking work fundamentally challenges how we think about educational competition and collaboration.",
    author: "Dr. Maria Gonzalez",
    title: "Professor of Educational Psychology, Stanford University",
    rating: 5
  },
  {
    quote: "Terzi's framework offers a revolutionary perspective on collective intelligence in learning environments.",
    author: "Prof. James Mitchell",
    title: "Director of Cognitive Science, MIT",
    rating: 5
  },
  {
    quote: "The Pyragogy methodology presents practical solutions to longstanding educational challenges.",
    author: "Dr. Sarah Chen",
    title: "Educational Innovation Researcher, Oxford",
    rating: 5
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="w-full flex-shrink-0 glass shadow-strong">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                
                <blockquote className="text-2xl font-serif italic leading-relaxed mb-6 text-foreground">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-current" />
                  ))}
                </div>
                
                <div>
                  <p className="font-semibold text-lg text-primary">{testimonial.author}</p>
                  <p className="text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-muted hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};