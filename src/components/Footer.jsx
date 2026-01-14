import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-slate-950 pt-24 pb-12 px-6 md:px-20 lg:px-32 w-full overflow-hidden border-t border-white/5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8">
          {/* BRAND COLUMN */}
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/logo.jpg"
                alt="WritersHub Logo"
                className="w-14 h-14 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <span className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Writers<span className="text-indigo-500">Hub</span>
              </span>
            </div>

            <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-10">
              The premier platform for elite writers and professional
              translators. We bridge the gap between global talent and
              industry-leading projects.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4">
              {[
                { Icon: Facebook, link: "https://facebook.com" },
                { Icon: Twitter, link: "https://twitter.com" },
                { Icon: Instagram, link: "https://instagram.com" },
                { Icon: Linkedin, link: "https://linkedin.com" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:-translate-y-1 transition-all duration-300">
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">
            <div>
              <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8 italic">
                Company
              </h3>
              <ul className="flex flex-col gap-4">
                {["Home", "About Us", "Contact Us", "Help & FAQs"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                        className="group flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-white transition-colors">
                        {item}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8 italic">
                Legal
              </h3>
              <ul className="flex flex-col gap-4">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-400 font-bold text-sm hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
            &copy; {currentYear} WritersHub • Engineered for Creators
          </p>
          <div className="flex gap-8">
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
              Status: Systems Online
            </span>
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
              Version 2.0.4
            </span>
          </div>
        </div>
      </div>



      {/* BIG BACKGROUND TEXT DECORATION */}
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 select-none pointer-events-none">
        <h2 className="text-[200px] font-black text-white/[0.02] leading-none uppercase italic tracking-tighter">
          Hub
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
