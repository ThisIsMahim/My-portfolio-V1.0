import { useState, FormEvent, useEffect } from 'react';
import { animate, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Instagram, Loader2, ChevronLeft } from 'lucide-react';
import MouseTrail from '@/components/MouseTrail';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '@/components/AnimatedBackground';

const socialLinks = [
  {
    platform: 'GitHub',
    icon: Github,
    url: 'https://github.com/ThisIsMahim',
    handle: '@ThisIsMahim'
  },
  {
    platform: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/c-m-mahim-masrafi-84b623223/',
    handle: '@C M Mahim Masrafi'
  },
  {
    platform: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/cm_mahim_masrafi_/',
    handle: '@cm_mahim_masrafi_'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('SsfFM7R4vPKjTjU8K');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.send(
        'service_f8hfjnh',
        'template_xo9hty5',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'SsfFM7R4vPKjTjU8K'
      );

      if (result.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatedBackground>
        <MouseTrail />
      <div className="min-h-screen">
     
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
          <div className="mb-12 flex items-center">
            <Link 
              to="/"
              className="mr-4 h-10 w-10 rounded-full border border-gold border-opacity-40 flex items-center justify-center text-gold hover-gold-glow smooth-transition hoverable"
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-gold text-3xl font-medium">Contact</h1>
          </div>

          <div className="max-w-4xl mx-auto pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">Get In Touch</h1>
              <p className="text-gray-400 text-lg">I'd love to hear from you.</p>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="mb-16 space-y-6"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-[#1F1F1F] border-2 border-gold/30 focus:border-gold text-white rounded-lg px-4 py-3 outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-[#1F1F1F] border-2 border-gold/30 focus:border-gold text-white rounded-lg px-4 py-3 outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  rows={6}
                  className="w-full bg-[#1F1F1F] border-2 border-gold/30 focus:border-gold text-white rounded-lg px-4 py-3 outline-none transition-colors resize-none"
                />
              </div>

              {submitStatus.message && (
                <div
                  className={`${
                    submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                  } text-center`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-white rounded-lg px-6 py-3 font-medium hover:bg-gold/90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </motion.form>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center space-x-8"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <social.icon
                    size={28}
                    className="text-white group-hover:text-gold transition-colors duration-300"
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {social.handle}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Contact; 