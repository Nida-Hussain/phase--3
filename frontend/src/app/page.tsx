// app/page.tsx
'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/30 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">
            Task<span className="text-indigo-400">Mestry</span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="hidden sm:block px-5 py-2 text-gray-300 hover:text-white transition"
            >
              Dashboard
            </Link>
            <Link 
              href="/login"
              className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:brightness-110 transition shadow-lg shadow-indigo-900/30"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%)]"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-wide">
            The Future of Productivity
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            Transform Your Tasks<br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Into Accomplishments
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Harness the power of AI to organize, prioritize, and execute your tasks with precision.
            Join thousands of professionals who have revolutionized their workflow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
            <Link
              href="/signup"
              className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg hover:brightness-110 transition shadow-xl shadow-indigo-900/40"
            >
              Get Started →
            </Link>
            <Link
              href="/demo"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-medium text-lg hover:bg-white/15 transition"
            >
              Try AI Chat →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl px-8 py-5 min-w-[180px]">
              <div className="text-3xl font-bold text-indigo-400">95%</div>
              <div className="text-gray-400 mt-1">Task Completion</div>
            </div>
            <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl px-8 py-5 min-w-[180px]">
              <div className="text-3xl font-bold text-purple-400">4.8/5</div>
              <div className="text-gray-400 mt-1">User Rating</div>
            </div>
            <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl px-8 py-5 min-w-[180px]">
              <div className="text-3xl font-bold text-pink-400">10K+</div>
              <div className="text-gray-400 mt-1">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Everything You Need to <span className="text-indigo-400">Succeed</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Powerful features designed to maximize your productivity and efficiency
          </p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: "🧠", title: "AI-Powered Insights", desc: "Intelligent suggestions on task prioritization and deadlines based on your habits" },
              { icon: "🧩", title: "Smart Organization", desc: "Automatically categorize and prioritize tasks with advanced algorithms" },
              { icon: "🔥", title: "Focus Mode", desc: "Eliminate distractions with dedicated focus blocks that adapt to your rhythm" },
              { icon: "🔄", title: "Real-time Sync", desc: "Instant updates across all your devices with seamless synchronization" },
              { icon: "📊", title: "Advanced Analytics", desc: "Deep insights into your productivity patterns and completion rates" },
              { icon: "👥", title: "Team Collaboration", desc: "Seamlessly collaborate with your team on shared projects and tasks" },
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Trusted by <span className="text-purple-400">Professionals</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Product Manager", text: "TaskMestry has completely transformed how I manage my daily tasks..." },
              { name: "Michael Chen", role: "Software Engineer", text: "Best task management tool I've used for the past 3 years. The AI is actually useful!" },
              { name: "Elena Rodriguez", role: "Marketing Director", text: "The analytics helped me identify my most productive hours..." },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-indigo-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Task<span className="text-indigo-400">Mestry</span>
              </h3>
              <p className="text-gray-400">
                Transform your tasks into accomplishments with the power of AI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/changelog">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TaskMestry. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}