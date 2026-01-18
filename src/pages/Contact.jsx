import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@jobconnect.com",
      subtitle: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      subtitle: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "123 Innovation Drive",
      subtitle: "San Francisco, CA 94107",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Monday - Friday",
      subtitle: "9:00 AM - 6:00 PM",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "bg-blue-600" },
    { icon: Twitter, href: "#", color: "bg-sky-500" },
    { icon: Instagram, href: "#", color: "bg-pink-600" },
    { icon: Linkedin, href: "#", color: "bg-blue-700" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <MessageSquare size={14} />
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
              We'd Love to Hear{" "}
              <span className="text-indigo-400">From You</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Have questions about JobsConnect? Need help with your account? Our
              team is here to support you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CONTACT INFO CARDS */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 uppercase italic">
                        {info.title}
                      </h3>
                      <p className="text-slate-900 font-bold mt-1">
                        {info.value}
                      </p>
                      <p className="text-slate-500 text-sm font-medium mt-1">
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* SOCIAL LINKS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900 rounded-2xl p-6 mt-6">
                <h3 className="font-black text-white uppercase italic mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform`}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CONTACT FORM */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl border border-slate-100">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-slate-600 font-medium max-w-md mx-auto">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-black text-slate-900 uppercase italic">
                        Send Us a{" "}
                        <span className="text-indigo-600">Message</span>
                      </h2>
                      <p className="text-slate-500 font-medium mt-2">
                        Fill out the form below and we'll get back to you as
                        soon as possible.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none">
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">
                            Partnership Opportunity
                          </option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}>
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
              FAQ
            </span>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mt-4">
              Frequently Asked{" "}
              <span className="text-indigo-600">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "How do I create an account?",
                a: "Click the 'Register' button in the top right corner. Choose your role (Job Seeker or Employer) and follow the simple sign-up process.",
              },
              {
                q: "Is JobsConnect free to use?",
                a: "Yes! Job seekers can browse and apply for jobs absolutely free. Employers can post jobs with a free tier, with optional premium features for enhanced visibility.",
              },
              {
                q: "How do I reset my password?",
                a: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you instructions to reset your password.",
              },
              {
                q: "How can I delete my account?",
                a: "Go to your Account Settings and scroll to the bottom. Click 'Delete Account' and confirm your decision. This action is irreversible.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-black text-slate-900 uppercase italic mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-600 font-medium">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
