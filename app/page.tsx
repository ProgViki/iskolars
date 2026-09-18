"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Code,
  Shield,
  Palette,
  Video,
  Monitor,
  GraduationCap,
  Globe,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Smartphone,
  Layout,
  BarChart3,
  Megaphone,
  Home,
  Wifi,
  Presentation,
  Briefcase,
  Heart,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  BookMarked,
  Clock,
} from "lucide-react";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ----------------------------- Animations Hook ----------------------------- */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ------------------------------ Reveal Wrapper ----------------------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ Animated Count ----------------------------- */
function Counter({ to, duration = 1500, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <div ref={ref}>
      {value}
      {suffix}
    </div>
  );
}

/* ------------------------------ Logo Component ----------------------------- */
function Logo({ size = 50, className = "" }: { size?: number; className?: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center ${className}`}
      >
        <GraduationCap className="h-6 w-6 text-white" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/newLogo1.png"
      alt="iSkolars Academy Logo"
      width={size}
      height={size}
      onError={() => setErr(true)}
      className={`object-contain ${className}`}
    />
  );
}

/* ------------------------------ Hero Slider -------------------------------- */
const heroSlides = [
  {
    highlight: "Future",
    text: "Master Your Future Today",
    sub: "Excel in local & foreign exams while mastering cutting-edge technology skills.",
    gradient: "from-blue-600 via-green-600 to-yellow-600",
  },
  {
    highlight: "Skills",
    text: "Build In-Demand Tech Skills",
    sub: "From Web Development to Cybersecurity — learn from certified industry experts.",
    gradient: "from-green-600 via-yellow-500 to-blue-600",
  },
  {
    highlight: "Exams",
    text: "Ace JAMB, IELTS & SAT",
    sub: "Comprehensive coaching, mock exams and personalized study plans that deliver results.",
    gradient: "from-yellow-500 via-orange-500 to-pink-500",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4 min-h-[260px]">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute transition-all duration-700 ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateY(0)" : "translateY(20px)",
            pointerEvents: i === index ? "auto" : "none",
            position: i === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            {slide.text.split(" ").map((w, wi) =>
              w.toLowerCase() === slide.highlight.toLowerCase() ? (
                <span
                  key={wi}
                  className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient`}
                >
                  {w}{" "}
                </span>
              ) : (
                <span key={wi} className="text-gray-900">
                  {w}{" "}
                </span>
              )
            )}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mt-4">{slide.sub}</p>
        </div>
      ))}
      {/* Dots */}
      <div className="flex space-x-2 pt-4 relative z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-gradient-to-r from-blue-600 to-green-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Testimonials Slider --------------------------- */
const testimonials = [
  {
    name: "Adaeze O.",
    role: "JAMB Student",
    text: "iSkolars helped me score 320 in JAMB. The tutors are patient and the mock exams prepared me perfectly.",
    rating: 5,
  },
  {
    name: "Tunde A.",
    role: "Web Dev Graduate",
    text: "I went from zero coding experience to landing a junior developer role in 6 months. Incredible program.",
    rating: 5,
  },
  {
    name: "Fatima B.",
    role: "IELTS Candidate",
    text: "Scored Band 8 in IELTS thanks to the personalized study plan and native-speaker instructors.",
    rating: 5,
  },
  {
    name: "Chidi N.",
    role: "Cybersecurity Student",
    text: "The hands-on labs and real-world projects made cybersecurity concepts click instantly. Highly recommend!",
    rating: 5,
  },
];

function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-4">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
                <CardContent className="p-8 text-center">
                  <Quote className="h-10 w-10 text-blue-500 mx-auto mb-4 opacity-60" />
                  <p className="text-lg text-gray-700 italic mb-6">"{t.text}"</p>
                  <div className="flex justify-center space-x-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prev}
        aria-label="Previous testimonial"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <button
        onClick={next}
        aria-label="Next testimonial"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-gradient-to-r from-blue-600 to-green-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Services Data ----------------------------- */
const services = [
  {
    icon: BookMarked,
    title: "Adult Education",
    desc: "Flexible literacy, numeracy and life-skills programs designed for working adults returning to education.",
    color: "blue",
    features: ["Basic literacy & numeracy", "Evening & weekend classes", "Certificate on completion"],
  },
  {
    icon: Home,
    title: "Home Lessons",
    desc: "One-on-one private tutoring at your home — perfect for focused learners who prefer personalized attention.",
    color: "green",
    features: ["Qualified private tutors", "Flexible scheduling", "All subjects & levels"],
  },
  {
    icon: Wifi,
    title: "Online Classes",
    desc: "Join interactive live classes from anywhere in the world with our virtual learning platform.",
    color: "indigo",
    features: ["Live & recorded sessions", "Interactive whiteboards", "Global access"],
  },
  {
    icon: Presentation,
    title: "Webinars & Workshops",
    desc: "Free and premium webinars on trending topics — tech, exam tips, career growth and more.",
    color: "purple",
    features: ["Industry expert hosts", "Q&A sessions", "Recorded playbacks"],
  },
  {
    icon: Briefcase,
    title: "Corporate Training",
    desc: "Upskill your team with customized technology and soft-skills training programs for organizations.",
    color: "amber",
    features: ["Tailored curriculum", "On-site or virtual", "Progress reports"],
  },
  {
    icon: Heart,
    title: "Career Counseling",
    desc: "Guidance on study paths, career choices, and admission processes — from experts who've been there.",
    color: "pink",
    features: ["1-on-1 sessions", "University applications", "Career roadmaps"],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200" },
};

/* ================================ MAIN ==================================== */
export default function ISkolarsAcademy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 overflow-x-hidden">
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient { animation: gradient 6s ease infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-24px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }

        .card-hover { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 24px 40px -12px rgba(59,130,246,0.25); }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
     {/* Header */}
<header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
  <div className="w-full px-4 sm:px-6 lg:px-10 py-3">
    <div className="flex items-center justify-between w-full">

      {/* Logo + name — extreme left */}
      <div className="flex items-center space-x-2.5 flex-shrink-0 group ml-0">
        <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Logo size={44} />
        </div>
        <div className="leading-tight">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent whitespace-nowrap">
            iSkolars Academy
          </h1>
          <p className="text-[11px] text-gray-600 whitespace-nowrap hidden sm:block">
            Excellence in Education & Technology
          </p>
        </div>
      </div>

      {/* Nav — pushed to the far right */}
      <nav className="hidden md:flex items-center gap-6 xl:gap-8 ml-auto">
        {["home", "services", "courses", "about", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="text-gray-700 hover:text-blue-600 transition-colors relative capitalize text-sm lg:text-base after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-green-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            {item}
          </a>
        ))}
        <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-md hover:shadow-lg transition-all hover:scale-105 ml-2">
          Enroll Now
        </Button>
      </nav>

    </div>
  </div>
</header>

      {/* Hero Section */}
      <section id="home" className="py-16 lg:py-24 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-green-200 rounded-full opacity-30 blur-3xl animate-float" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="space-y-8" y={40}>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:scale-105 transition-transform inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Premier Educational Institute
              </Badge>

              <div className="relative">
                <HeroSlider />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.03] group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Learning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent hover:scale-[1.03] transition-all group"
                >
                  View Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {[
                  { to: 500, suffix: "+", label: "Students Trained", color: "text-blue-600" },
                  { to: 95, suffix: "%", label: "Success Rate", color: "text-green-600" },
                  { to: 50, suffix: "+", label: "Courses", color: "text-yellow-600" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-2xl font-bold ${s.color}`}>
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative" delay={200} y={60}>
              <div className="relative z-10 animate-float-slow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/iskolars.png?height=600&width=500"
                  alt="Students learning at iSkolars Academy"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-30 blur-3xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-200 to-green-200 rounded-full opacity-30 blur-3xl animate-float-slow" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Section (NEW) */}
      <section id="services" className="py-20 bg-white/60 relative">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4">What We Offer</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond courses, we provide a full suite of educational services tailored to learners of every age and
              background.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const c = colorMap[s.color];
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <Card className={`card-hover ${c.border} h-full bg-white`}>
                    <CardHeader>
                      <div
                        className={`w-14 h-14 ${c.bg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon className={`h-7 w-7 ${c.text}`} />
                      </div>
                      <CardTitle className="text-gray-900">{s.title}</CardTitle>
                      <CardDescription>{s.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Our Programs</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Learning Pathways</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From exam preparation to professional tech skills — diverse programs designed to launch your academic
              and career success.
            </p>
          </Reveal>

          {/* Academic Coaching */}
          <div className="mb-16">
            <Reveal>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-blue-600" />
                Academic Coaching & Exam Preparation
              </h3>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Local Exams",
                  desc: "JAMB, WAEC, NECO, Post-UTME",
                  color: "blue",
                  features: ["Comprehensive syllabus coverage", "Mock exams & practice tests", "Expert tutoring"],
                },
                {
                  icon: Award,
                  title: "International Exams",
                  desc: "IELTS, TOEFL, SAT, GRE, GMAT",
                  color: "green",
                  features: ["Native speaker instructors", "Personalized study plans", "Exam registration assistance"],
                },
                {
                  icon: Users,
                  title: "Registration Services",
                  desc: "End-to-end exam registration",
                  color: "amber",
                  features: ["Document preparation", "Online registration", "Payment processing"],
                },
              ].map((c, i) => {
                const col = colorMap[c.color];
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={i * 100}>
                    <Card className={`card-hover ${col.border} bg-white h-full`}>
                      <CardHeader>
                        <div className={`w-12 h-12 ${col.bg} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${col.text}`} />
                        </div>
                        <CardTitle className="text-gray-900">{c.title}</CardTitle>
                        <CardDescription>{c.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {c.features.map((f) => (
                            <li key={f} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Tech Courses */}
          <div>
            <Reveal>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Code className="mr-3 h-6 w-6 text-green-600" />
                Technology Training Programs
              </h3>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Code, title: "Web Development", desc: "Frontend & Backend Development", tags: ["HTML/CSS", "JavaScript", "React", "Node.js"], text: "Build modern, responsive websites and web applications", color: "blue" },
                { icon: Smartphone, title: "App Development", desc: "iOS & Android Development", tags: ["React Native", "Flutter", "Swift", "Kotlin"], text: "Build native and cross-platform mobile applications", color: "indigo" },
                { icon: Layout, title: "UI/UX Design", desc: "User Interface & Experience Design", tags: ["Figma", "Adobe XD", "User Research", "Prototyping"], text: "Design intuitive and engaging user experiences", color: "pink" },
                { icon: BarChart3, title: "Data Analytics", desc: "Data Science & Business Intelligence", tags: ["Python", "SQL", "Tableau", "Power BI"], text: "Transform data into actionable business insights", color: "amber" },
                { icon: Megaphone, title: "Digital Marketing", desc: "Online Marketing & Strategy", tags: ["SEO", "Social Media", "Content", "Google Ads"], text: "Master digital strategies to grow businesses online", color: "amber" },
                { icon: Shield, title: "Cybersecurity", desc: "Ethical Hacking & Security", tags: ["Network Security", "Pen Testing", "CISSP"], text: "Protect systems and networks from cyber threats", color: "pink" },
                { icon: Palette, title: "Design & Graphics", desc: "Graphics & 3D Design", tags: ["Photoshop", "Illustrator", "Corel Draw"], text: "Create stunning visuals and user experiences", color: "purple" },
                { icon: Video, title: "Video Production", desc: "Video Editing & Animation", tags: ["After Effects", "Premiere Pro", "DaVinci"], text: "Professional video editing and motion graphics", color: "amber" },
                { icon: Monitor, title: "Computer Basics", desc: "Digital Literacy & Office Skills", tags: ["MS Office", "MS Excel", "Internet", "Typing"], text: "Essential computer skills for the modern world", color: "indigo" },
              ].map((c, i) => {
                const col = colorMap[c.color];
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={(i % 3) * 100}>
                    <Card className={`card-hover ${col.border} bg-white h-full`}>
                      <CardHeader>
                        <div className={`w-12 h-12 ${col.bg} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${col.text}`} />
                        </div>
                        <CardTitle className="text-gray-900">{c.title}</CardTitle>
                        <CardDescription>{c.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {c.tags.map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{c.text}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (NEW) */}
      <section className="py-20 bg-white/60">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          </Reveal>
          <Reveal delay={150}>
            <TestimonialsSlider />
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal y={40}>
              <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">About iSkolars Academy</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Bridging Education & Technology in Lagos</h2>
              <p className="text-lg text-gray-600 mb-6">
                Located in the heart of Ajah, Lagos, iSkolars Academy stands as a beacon of educational excellence,
                combining traditional academic coaching with cutting-edge technology training.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: CheckCircle, color: "blue", title: "Expert Instructors", desc: "Certified professionals with years of industry experience" },
                  { icon: CheckCircle, color: "green", title: "Modern Facilities", desc: "State-of-the-art classrooms and computer labs" },
                  { icon: CheckCircle, color: "amber", title: "Flexible Learning", desc: "Weekend, evening, and intensive programs available" },
                ].map((f, i) => {
                  const col = colorMap[f.color];
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-start space-x-3 group">
                      <div
                        className={`w-6 h-6 ${col.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`h-4 w-4 ${col.text}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{f.title}</h4>
                        <p className="text-gray-600">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full border-2 border-white hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Rated 4.9/5 by 200+ students</p>
                </div>
              </div>
            </Reveal>

            <Reveal className="relative" delay={150} y={60}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/iskolars2.png?height=500&width=600"
                alt="iSkolars Academy campus"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Located in Ajah</h4>
                    <p className="text-sm text-gray-600">Easy access, modern facilities</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />

        <div className="container mx-auto px-4 relative">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to transform your future? Contact us to learn more about our programs and enrollment process.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal y={40}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, label: "Location", value: "Ajah, Lagos State, Nigeria" },
                      { icon: Phone, label: "Phone", value: "+234 (0) 8107636586" },
                      { icon: Mail, label: "Email", value: "info@iskolarsacademy.com" },
                    ].map((c, i) => {
                      const Icon = c.icon;
                      return (
                        <div key={i} className="flex items-center space-x-4 group">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all">
                            <Icon className="h-6 w-6 text-yellow-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{c.label}</h4>
                            <p className="text-blue-100">{c.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
                  <div className="space-y-2 text-blue-100">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150} y={40}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors" placeholder="+234 123 456 7890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Interest</label>
                    <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors" placeholder="Web Development, IELTS, etc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors"
                      rows={4}
                      placeholder="Tell us about your learning goals..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 hover:scale-[1.02] transition-transform shadow-lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Logo size={40} />
                <div>
                  <h3 className="text-xl font-bold">iSkolars Academy</h3>
                  <p className="text-xs text-gray-400">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering students with academic excellence and cutting-edge technology skills in the heart of Lagos.
              </p>
            </div>

            {[
              { title: "Academic Programs", links: ["JAMB/UTME", "WAEC/NECO", "IELTS/TOEFL", "SAT/GRE"] },
              { title: "Tech Courses", links: ["Web Development", "Cybersecurity", "Graphic Design", "Video Production"] },
              { title: "Quick Links", links: ["About Us", "Admissions", "Student Portal", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-white transition-colors inline-block hover:translate-x-1">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} iSkolars Academy. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}