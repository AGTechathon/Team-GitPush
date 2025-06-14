import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TestimonialsSectionProps {
  onTestimonialClick: (author: string) => void;
}

const testimonials = [
  {
    id: 1,
    quote:
      "RepeatHarmony has transformed my daily routine. The personalized therapy suggestions are spot on, and the mood tracking helps me understand myself better.",
    author: "Alicia K.",
    role: "Verified User",
    avatar: "AK",
    rating: 5,
    verified: true,
    location: "San Francisco, CA",
    joinDate: "3 months ago",
    helpfulVotes: 23,
  },
  {
    id: 2,
    quote:
      "I never thought an app could make such a difference. The calming music and supportive community have been a lifeline during tough times.",
    author: "Ben S.",
    role: "Community Member",
    avatar: "BS",
    rating: 5,
    verified: true,
    location: "New York, NY",
    joinDate: "6 months ago",
    helpfulVotes: 45,
  },
  {
    id: 3,
    quote:
      "As a therapist, I'm impressed by RepeatHarmony's approach. It's an excellent tool for self-reflection and provides valuable insights for users.",
    author: "Dr. Luna V.",
    role: "Mental Health Professional",
    avatar: "LV",
    rating: 5,
    verified: true,
    location: "Los Angeles, CA",
    joinDate: "1 year ago",
    helpfulVotes: 89,
  },
  {
    id: 4,
    quote:
      "The AI-powered mood analysis is incredibly accurate. It helped me identify patterns I never noticed before and gave me actionable steps to improve.",
    author: "Marcus T.",
    role: "Software Engineer",
    avatar: "MT",
    rating: 5,
    verified: true,
    location: "Austin, TX",
    joinDate: "4 months ago",
    helpfulVotes: 31,
  },
  {
    id: 5,
    quote:
      "RepeatHarmony's music therapy feature is a game-changer. The AI curates the perfect playlist for my mood every time.",
    author: "Sofia R.",
    role: "Artist",
    avatar: "SR",
    rating: 5,
    verified: true,
    location: "Miami, FL",
    joinDate: "2 months ago",
    helpfulVotes: 18,
  },
];

const TestimonialsSection = ({
  onTestimonialClick,
}: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedTestimonials, setLikedTestimonials] = useState<Set<number>>(
    new Set(),
  );
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(
    new Set(),
  );

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleLike = (testimonialId: number) => {
    setLikedTestimonials((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId);
      } else {
        newSet.add(testimonialId);
      }
      return newSet;
    });
  };

  const toggleExpanded = (testimonialId: number) => {
    setExpandedTestimonials((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId);
      } else {
        newSet.add(testimonialId);
      }
      return newSet;
    });
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <section className="py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="bg-purple-600/20 text-purple-300 mb-4"
          >
            User Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Hear from individuals whose lives have been positively impacted by
            RepeatHarmony.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-slate-400">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-slate-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                onClick={() => onTestimonialClick(testimonial.author)}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-400 text-xs"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-300 text-lg leading-relaxed mb-6 italic group-hover:text-slate-200 transition-colors">
                    "
                    {expandedTestimonials.has(testimonial.id)
                      ? testimonial.quote
                      : testimonial.quote.length > 120
                        ? testimonial.quote.substring(0, 120) + "..."
                        : testimonial.quote}
                    "
                  </blockquote>

                  {testimonial.quote.length > 120 && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(testimonial.id);
                      }}
                      className="text-blue-400 hover:text-blue-300 p-0 h-auto mb-4"
                    >
                      {expandedTestimonials.has(testimonial.id)
                        ? "Show less"
                        : "Read more"}
                    </Button>
                  )}

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" alt={testimonial.author} />
                        <AvatarFallback className="bg-blue-600 text-white font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-slate-400">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-slate-500">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(testimonial.id);
                        }}
                        className={`h-8 px-2 ${
                          likedTestimonials.has(testimonial.id)
                            ? "text-red-400 hover:text-red-300"
                            : "text-slate-400 hover:text-red-400"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 mr-1 ${likedTestimonials.has(testimonial.id) ? "fill-current" : ""}`}
                        />
                        {testimonial.helpfulVotes +
                          (likedTestimonials.has(testimonial.id) ? 1 : 0)}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTestimonialClick(testimonial.author);
                        }}
                        className="text-slate-400 hover:text-blue-400 h-8 px-2"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>

                    <span className="text-xs text-slate-500">
                      {testimonial.joinDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > itemsPerPage && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {testimonials.length > itemsPerPage && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === i
                    ? "bg-blue-500"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">
            Ready to start your own success story?
          </p>
          <Button
            size="lg"
            onClick={() => onTestimonialClick("You")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
