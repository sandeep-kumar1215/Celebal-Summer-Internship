'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence, Variants, easeOut } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import Image from 'next/image';
import {
  BookMarked,
  Bell,
  Languages,
  ClipboardList,
  SearchCheck,
  Plus,
  Minus,
  Calendar1,
  Calendar,
  Timer,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: easeOut,
      },
    }),
  };

  const features = [
    {
      icon: <SearchCheck size={32} />,
      title: ' Create New Tasks',
      desc: 'Easily generate tasks for bugs, stories, or to-dos. Stay organized from the very first step.',
    },
    {
      icon: <BookMarked size={32} />,
      title: 'Assign Team Members',
      desc: 'Quickly delegate tasks to the right people. Ensure clarity and accountability across teams.',
    },
    {
      icon: <Calendar size={32} />,
      title: 'Set Due Dates',
      desc: 'Set Due Add deadlines to keep tasks on track. Never miss important milestones again.Dates',
    },
    {
      icon: <Bell size={32} />,
      title: ' Track Progress Status',
      desc: 'Visualize workflow stages using boards. Monitor task movement from start to finish.',
    },
    {
      icon: <Timer size={32} />,
      title: 'Log Work Time',
      desc: 'Record hours spent on each task. Helps in time tracking and reporting.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white relative overflow-x-hidden font-sans">

      <nav className="absolute top-0 w-full px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10 flex items-center justify-between">
        {/* Logo and Text */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Image src="/logo.png" alt="KanBan Logo" width={32} height={32} />
          <span>KanBan App</span>
        </div>

        {/* Toggle & Button */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button
            onClick={() => router.push('/sign-in')}
            className="px-4 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </nav>



      {/* Hero */}
<section className="flex flex-col items-center justify-center px-6 md:px-20 pt-28 min-h-[90vh] text-center gap-6">
  <motion.span
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={0}
    className="relative px-8 py-3 text-lg font-semibold rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 overflow-hidden shadow-md"
  >
    Introducing KanBan App✨
  </motion.span>

  <motion.h1
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={1}
    className="text-4xl md:text-5xl font-bold max-w-3xl"
  >
    &quot;Your Agile Companion for Smarter Task Flow.&quot;
  </motion.h1>

  <motion.p
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={2}
    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
  >
    Track, manage, and streamline your work with drag-and-drop Kanban boards.
  </motion.p>

  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={3}
    className="flex gap-4 mt-4"
  >
    <button
      onClick={() => router.push('/sign-in')}
      className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
    >
      Get Started
    </button>
    <button className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 transform hover:scale-105">
      Let’s Explore 👇
    </button>
  </motion.div>

  {/* Image with Animated Border */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="mt-10 relative w-fit mx-auto"
>
  {/* Animated Border Wrapper */}
  <div className="relative p-2 mb-8 rounded-xl before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-gradient before:animate-spin-slow z-0">
    {/* Actual Image */}
    <Image
      width={1100}
      height={1100}
      src="/Hero_Section_Image.png"
      alt="Hero Illustration"
      className="relative z-10 rounded-xl border-2 border-white dark:border-black"
    />
  </div>
</motion.div>

</section>


     {/* Features */}
<section className="py-10 px-6 bg-gray-100 dark:bg-zinc-950 text-center">
  <motion.h2
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={0}
    className="text-lg text-gray-500 font-semibold mb-12"
  >
    FEATURES
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {/* Left Column */}
    <div className="flex flex-col gap-6">
      {/* Tall Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
        className="group h-auto lg:h-[350px] relative px-4 py-8 rounded-2xl shadow-md border bg-white dark:bg-black transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer flex flex-col justify-end"
      >
        <div className="m-2 text-black dark:text-white">
          <div className="mb-2">{features[0].icon}</div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-1 group-hover:-translate-y-1 transition-all duration-300">
              {features[0].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:-translate-y-1 transition-all duration-300">
              {features[0].desc}
            </p>
            <button
              onClick={() => router.push('/sign-in')}
              className="absolute bottom-4 left-6 text-sm font-semibold opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:rounded-lg transition-opacity duration-300 text-black dark:text-white flex items-center gap-1"
            >
              Learn more <span>→</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Short Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="group h-auto lg:h-[180px] relative px-4 py-8 rounded-2xl shadow-md border bg-white dark:bg-black transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer flex flex-col justify-end"
      >
        <div className="m-2 text-black dark:text-white">
          <div className="mb-2">{features[1].icon}</div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-1 group-hover:-translate-y-1 transition-all duration-300">
              {features[1].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:-translate-y-1 transition-all duration-300">
              {features[1].desc}
            </p>
            <button
              onClick={() => router.push('/sign-in')}
              className="absolute bottom-4 left-6 text-sm font-semibold opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:rounded-lg transition-opacity duration-300 text-black dark:text-white flex items-center gap-1"
            >
              Learn more <span>→</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>

   {/* Middle Column */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeUp}
  custom={2}
  className="group h-auto lg:h-[555px] relative px-4 py-8 rounded-2xl shadow-md border bg-white dark:bg-black transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer flex flex-col justify-end"
>
  <div className="m-2 text-black dark:text-white">
    <div className="mb-2">{features[2].icon}</div>
    <div className="text-left">
      <h3 className="text-xl font-semibold mb-1 group-hover:-translate-y-1 transition-all duration-300">
        {features[2].title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:-translate-y-1 transition-all duration-300">
        {features[2].desc}
      </p>
      <button
        onClick={() => router.push('/sign-in')}
        className="absolute bottom-4 left-6 text-sm font-semibold opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:rounded-lg transition-opacity duration-300 text-black dark:text-white flex items-center gap-1"
      >
        Learn more <span>→</span>
      </button>
    </div>
  </div>
</motion.div>


    {/* Right Column */}
    <div className="flex flex-col gap-6">
      {/* Short Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
        className="group h-auto lg:h-[180px] relative px-4 py-8 rounded-2xl shadow-md border bg-white dark:bg-black transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer flex flex-col justify-end"
      >
        <div className="m-2 text-black dark:text-white">
          <div className="mb-2">{features[3].icon}</div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-1 group-hover:-translate-y-1 transition-all duration-300">
              {features[3].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:-translate-y-1 transition-all duration-300">
              {features[3].desc}
            </p>
            <button
              onClick={() => router.push('/sign-in')}
              className="absolute bottom-4 left-6 text-sm font-semibold opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:rounded-lg transition-opacity duration-300 text-black dark:text-white flex items-center gap-1"
            >
              Learn more <span>→</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tall Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
        className="group h-auto lg:h-[350px] relative px-4 py-8 rounded-2xl shadow-md border bg-white dark:bg-black transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer flex flex-col justify-end"
      >
        <div className="m-2 text-black dark:text-white">
          <div className="mb-2">{features[4].icon}</div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-1 group-hover:-translate-y-1 transition-all duration-300">
              {features[4].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:-translate-y-1 transition-all duration-300">
              {features[4].desc}
            </p>
            <button
              onClick={() => router.push('/sign-in')}
              className="absolute bottom-4 left-6 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black dark:text-white flex items-center gap-1"
            >
              Learn more <span>→</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>



      {/* FAQ */}
      <section className="py-10 px-6 bg-white dark:bg-black text-left">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-lg text-gray-500 font-semibold mb-12 text-center"
        >
          FAQ
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: 'What is KanBan App?',
              answer:
                'KanBan App is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity.',
            },
            {
              question: 'How does KanBan App compare to other project management tools?',
              answer:
                'KanBan App offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types.',
            },
            {
              question: 'Is KanBan App suitable for small teams?',
              answer:
                'Absolutely! KanBan App is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from KanBan features.',
            },
            {
              question: 'What key features does KanBan App offer?',
              answer:
                'KanBan App provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience.',
            },
            {
              question: 'Can KanBan App handle multiple projects simultaneously?',
              answer:
                'Yes, KanBan App is built to manage multiple projects concurrently. You can easily switch between projects, and get a birds-eye view of all your ongoing work. This makes KanBan App ideal for organizations juggling multiple projects or clients.',
            },
            {
              question: 'Is there a learning curve for new users?',
              answer:
                'While KanBan App is packed with features, we have designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation.',
            },
          ].map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openFAQ === index}
              onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
        <footer className="mt-4">
  {/* Big Line */}
  <div className="text-center text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-300 pt-6 pb-6 dark:border-zinc-700">
    KanBan App – Your Agile Companion
  </div>

  {/* Secondary Line with Link */}
  <div className="text-center text-base md:text-lg font-normal text-gray-600 dark:text-gray-400 mb-16">
    Let&apos;s Try Now –{' '}
    <span
      onClick={() => router.push('/sign-in')}
      className="text-gray-600 dark:text-gray-400 underline cursor-pointer hover:text-gray-800 dark:hover:text-blue-300 transition"
    >
      Get Started.
    </span>
  </div>

  {/* Bottom Row */}
  <div className="flex items-center justify-between px-6 md:px-20 py-6 border-t border-gray-200 dark:border-zinc-700 text-sm text-gray-500 dark:text-gray-400">
    <div>
      Built by{' '}
      <a
        href="https://ajaykhatii.vercel.app"
        className="underline hover:text-black dark:hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sandeep Kumar
      </a>
    </div>

    <div>
      <a
        href="https://www.linkedin.com/in/sandeep-115742289"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black dark:hover:text-white"
      >
        {/* Lucide LinkedIn Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 110 4 2 2 0 010-4z"
          />
        </svg>
      </a>
    </div>
  </div>
</footer>


    </div>
  );
}

// FAQ Accordion Component
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border rounded-xl p-4 bg-gray-50 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <h3 className="font-semibold text-lg">{faq.question}</h3>
        <span className="text-xl">{isOpen ? <Minus size={20} /> : <Plus size={20} />}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-gray-600 dark:text-gray-300 overflow-hidden"
          >
            {faq.answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
