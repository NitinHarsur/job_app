import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* ===== HERO ===== */}
      <section className="landing-hero">
        <div className="hero-bg-circle"></div>
        <div className="hero-bg-circle"></div>
        <div className="hero-bg-circle"></div>
        <div className="page-container">
          <div className="hero-content">
            <h1>
              Find Your <span className="accent">Dream Job,</span><br />
              Land Your Next Role
            </h1>
            <p className="hero-subtitle">
              Thousands of jobs from top companies. Apply in one click.
            </p>
            <div className="hero-buttons">
              <Link to="/jobs" className="btn btn-primary btn-lg">Browse Jobs</Link>
              <Link to="/signup" className="btn btn-outline-white btn-lg">Post a Job</Link>
            </div>
            <div className="hero-chips">
              <span className="hero-chip">Tech</span>
              <span className="hero-chip">Design</span>
              <span className="hero-chip">Finance</span>
              <span className="hero-chip">Healthcare</span>
              <span className="hero-chip">Marketing</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-mock-card">
              <div className="hero-mock-header">
                <div className="hero-mock-logo">G</div>
                <div className="hero-mock-info">
                  <h4>Google Inc.</h4>
                  <p>Senior Frontend Developer</p>
                </div>
              </div>
              <div className="hero-mock-details">
                <span className="hero-mock-tag hero-mock-salary">$120k – $180k</span>
                <span className="hero-mock-tag hero-mock-loc">San Francisco</span>
                <span className="hero-mock-tag hero-mock-type">Full Time</span>
              </div>
              <button className="hero-mock-btn">Apply Now →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="landing-stats">
        <div className="page-container">
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-text">Jobs Posted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-text">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-text">Job Seekers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-text">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section">
        <div className="page-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
          <div className="steps-grid">
            <div className="card step-card">
              <div className="card-body">
                <div className="step-number">1</div>
                <div className="step-icon">/* Icon */</div>
                <h3>Create Account</h3>
                <p>Sign up in seconds, no credit card needed. Get instant access to thousands of opportunities.</p>
              </div>
            </div>
            <div className="card step-card">
              <div className="card-body">
                <div className="step-number">2</div>
                <div className="step-icon">/* Icon */</div>
                <h3>Search Jobs</h3>
                <p>Browse thousands of listings, filter by location, type, and company. Find your perfect match.</p>
              </div>
            </div>
            <div className="card step-card">
              <div className="card-body">
                <div className="step-number">3</div>
                <div className="step-icon">/* Icon */</div>
                <h3>Apply Instantly</h3>
                <p>One click apply, track all your applications in real-time. Land your dream role faster.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section section-gray">
        <div className="page-container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Explore opportunities across industries</p>
          <div className="category-grid">
            {[
              { icon: '', name: 'Technology', count: '2,400' },
              { icon: '', name: 'Design & Creative', count: '1,200' },
              { icon: '', name: 'Finance & Accounting', count: '980' },
              { icon: '', name: 'Healthcare', count: '1,500' },
              { icon: '', name: 'Marketing & Sales', count: '1,800' },
              { icon: '', name: 'Legal & Compliance', count: '640' },
            ].map((cat) => (
              <div className="card category-card" key={cat.name}>
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.count} jobs available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section section-dark">
        <div className="page-container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">Everything you need to accelerate your career</p>
          <div className="features-grid">
            {[
              { icon: 'V', title: 'Verified Companies Only', desc: 'Every company is vetted for authenticity and quality.' },
              { icon: 'A', title: 'Apply in One Click', desc: 'Streamlined applications — no lengthy forms.' },
              { icon: 'B', title: 'Real-time Job Alerts', desc: 'Get notified instantly when matching jobs are posted.' },
              { icon: 'S', title: 'Secure & Private', desc: 'Your data is protected with enterprise-grade security.' },
            ].map((f) => (
              <div className="card feature-card" key={f.title}>
                <div className="feature-icon-circle">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="page-container">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">Trusted by thousands of professionals worldwide</p>
          <div className="testimonials-grid">
            {[
              { name: 'Sarah Johnson', role: 'Frontend Developer', color: '#5B6AF0', initials: 'SJ', text: 'JobBoard made my job search so much easier. I found my dream role within a week of signing up!' },
              { name: 'Michael Chen', role: 'Product Manager', color: '#22C55E', initials: 'MC', text: 'The one-click apply feature is a game changer. I applied to 20+ jobs in a single afternoon.' },
              { name: 'Priya Patel', role: 'UX Designer', color: '#F59E0B', initials: 'PP', text: 'Clean interface, verified companies, and great job listings. Highly recommend for anyone job hunting.' },
            ].map((t) => (
              <div className="card testimonial-card" key={t.name}>
                <div className="card-body">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" style={{ background: t.color }}>{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="page-container">
          <h2>Ready to Find Your Next Opportunity?</h2>
          <p>Join thousands of professionals already using JobBoard</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-white btn-lg">Sign Up Free</Link>
            <a href="#how-it-works" className="btn btn-outline-white btn-lg">Learn More</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="page-container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Job<span>Board</span></div>
              <p className="footer-tagline">Connecting talent with opportunity. Find your dream job or hire the best candidates with our modern job platform.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/jobs">Browse Jobs</Link></li>
                <li><Link to="/signup">Create Account</Link></li>
                <li><Link to="/login">Sign In</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>For Employers</h4>
              <ul>
                <li><Link to="/signup">Post a Job</Link></li>
                <li><Link to="/signup">Employer Dashboard</Link></li>
                <li><Link to="/signup">Pricing</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:hello@jobboard.com">hello@jobboard.com</a></li>
                <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
                <li><span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '.88rem' }}>San Francisco, CA</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copyright">© 2026 JobBoard. All rights reserved.</span>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Twitter">Twitter</a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" className="footer-social-link" aria-label="GitHub">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
