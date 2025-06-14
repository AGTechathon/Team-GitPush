import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Github,
  Youtube,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FooterSectionProps {
  onNewsletterSignup?: (email: string) => boolean;
}

const FooterSection = ({ onNewsletterSignup }: FooterSectionProps) => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setTimeout(() => {
        toast({
          title: "Email Required",
          description: "Please enter your email address.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setTimeout(() => {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    setIsSubscribing(true);

    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false);
      const success = onNewsletterSignup ? onNewsletterSignup(email) : true;

      if (success) {
        setEmail("");
        setTimeout(() => {
          toast({
            title: "Successfully Subscribed!",
            description: "Thank you for subscribing to RepeatHarmony updates.",
          });
        }, 0);
      }
    }, 1500);
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "API", href: "#api" },
      { label: "Mobile App", href: "#mobile" },
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Contact Us", href: "#contact" },
      { label: "Community", href: "/forum" },
      { label: "Status", href: "#status" },
    ],
    company: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  };

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
  ];

  const handleLinkClick = (href: string, label: string) => {
    if (href.startsWith("#")) {
      // Handle scroll to section or show placeholder
      setTimeout(() => {
        toast({
          title: label,
          description: "This section will be available soon.",
        });
      }, 0);
    }
  };

  const handleSocialClick = (label: string) => {
    setTimeout(() => {
      toast({
        title: `${label} Profile`,
        description: `Visit our ${label} page for updates and community discussions.`,
      });
    }, 0);
  };

  return (
    <footer className="bg-slate-950 text-white py-16 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-400 mr-2" />
            <h3 className="text-2xl font-bold">
              Stay updated with RepeatHarmony
            </h3>
          </div>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Get the latest insights, tips, and updates delivered to your inbox
            weekly.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
              disabled={isSubscribing}
              required
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 whitespace-nowrap disabled:opacity-50"
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">RepeatHarmony</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your personal AI-powered mental health companion for emotional
              well-being and inner peace.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@repeatharmony.com</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href, link.label)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href, link.label)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href, link.label)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social.label)}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors group"
                  >
                    <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                  </button>
                );
              })}
            </div>
            <p className="text-slate-400 text-sm">
              Join our community of mental wellness enthusiasts.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © 2025 RepeatHarmony. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center space-x-6 text-slate-400 text-sm">
            {footerLinks.legal.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.href, link.label)}
                className="hover:text-blue-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selector */}
        <div className="text-center mt-8">
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setTimeout(() => {
                toast({
                  title: "Language Changed",
                  description: `Language set to ${e.target.value}.`,
                });
              }, 0);
            }}
            className="bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1 rounded text-sm hover:border-slate-600 focus:border-blue-500 transition-colors"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
