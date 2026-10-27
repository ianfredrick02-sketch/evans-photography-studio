import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { studioConfig, navigationItems } from './data/siteConfig';
import { galleryItems } from './data/galleryData';
import { services } from './data/services';
import { packages } from './data/packages';
import { aboutSections, studioValues } from './data/aboutContent';

const STORAGE_KEYS = {
  enquiries: 'evans_enquiries',
  gallery: 'evans_gallery',
  admin: 'evans_admin'
};

function getWhatsAppUrl(message, number = studioConfig.whatsappNumber) {
  const clean = number.replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link to="/" className="brand-mark" aria-label="Evans Photography Studio home">
            <span className="brand-word">Evans</span>
            <span className="brand-sub">Photography Studio</span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href={getWhatsAppUrl('Hello Evans Photography Studio, I would like to enquire about your photography services and available booking dates.')}
              className="button button-secondary tiny-mobile"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link to="/booking" className="button primary">Book a Session</Link>
          </div>

          <button
            className="mobile-toggle"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu container">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/booking" className="button primary block" onClick={() => setMobileMenuOpen(false)}>
              Book a Session
            </Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand-mark footer-brand">
              <span className="brand-word">Evans</span>
              <span className="brand-sub">Photography Studio</span>
            </div>
            <p>{studioConfig.tagline}</p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${studioConfig.phone}`}>{studioConfig.phone}</a></li>
              <li><a href={`mailto:${studioConfig.email}`}>{studioConfig.email}</a></li>
              <li>{studioConfig.location}</li>
            </ul>
          </div>

          <div>
            <h4>Follow</h4>
            <ul>
              {studioConfig.socialLinks.map((link) => (
                <li key={link.label}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 {studioConfig.name}. All rights reserved.</span>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      <a
        href={getWhatsAppUrl('Hello Evans Photography Studio, I would like to enquire about your photography services and available booking dates.')}
        className="floating-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}

function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.gallery) || 'null');
    const source = saved && saved.length ? saved : galleryItems;
    setFeatured(source.filter((item) => item.featured).slice(0, 3));
  }, []);

  const heroImage = galleryItems[0];

  return (
    <>
      <section className="hero-section">
        <div className="hero-photo" style={{ backgroundImage: `url(${heroImage.image})` }} aria-label={heroImage.alt} />
        <div className="container hero-content">
          <p className="eyebrow">Bamburi, Mombasa, Kenya</p>
          <h1>Every Moment, Beautifully Captured.</h1>
          <p className="lede">
            Elegant storytelling photography for weddings, portraits, families, events, and brands — crafted with intention and delivered with artistry.
          </p>
          <div className="cta-row">
            <Link to="/portfolio" className="button primary">Explore Our Work</Link>
            <Link to="/booking" className="button button-secondary">Book a Session</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container intro-grid">
          <div>
            <p className="eyebrow">About the studio</p>
            <h2>Photography that feels honest, cinematic, and personal.</h2>
          </div>
          <div>
            <p>{studioConfig.tagline} We approach every session with a refined eye for light, emotion, and atmosphere.</p>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container section-header align-left">
          <p className="eyebrow">Featured work</p>
          <h2>Selected moments from the studio.</h2>
        </div>
        <div className="container three-up-grid">
          {featured.map((item) => (
            <article key={item.id} className="photo-card">
              <img src={item.image} alt={item.alt} loading="lazy" />
              <div className="meta">
                <strong>{item.title}</strong>
                <span>{item.category}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-header">
          <p className="eyebrow">Services</p>
          <h2>Photography experiences designed around real stories.</h2>
        </div>
        <div className="container service-grid">
          {services.slice(0, 4).map((service) => (
            <article className="service-card" key={service.id}>
              <img src={service.image} alt={service.title} loading="lazy" />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.inclusions.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted-bg">
        <div className="container cta-banner">
          <div>
            <p className="eyebrow">Ready to tell your story?</p>
            <h2>Let’s plan your session.</h2>
          </div>
          <Link to="/booking" className="button primary">Book a Photography Session</Link>
        </div>
      </section>
    </>
  );
}

function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [images, setImages] = useState(galleryItems);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.gallery) || 'null');
    const source = saved && saved.length ? saved : galleryItems;
    setImages(source);
  }, []);

  const categories = ['All', ...new Set(images.map((item) => item.category))];
  const filtered = activeCategory === 'All' ? images : images.filter((item) => item.category === activeCategory);

  return (
    <div className="page-shell section">
      <div className="container section-header align-left">
        <p className="eyebrow">Portfolio</p>
        <h1>Recent work and collections.</h1>
      </div>

      <div className="container filter-bar" aria-label="Portfolio filters">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={activeCategory === item ? 'filter active' : 'filter'}
            onClick={() => setActiveCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="container portfolio-grid">
          {filtered.map((image) => (
            <button key={image.id} type="button" className="portfolio-card" onClick={() => setSelectedImage(image)}>
              <img src={image.image} alt={image.alt} loading="lazy" />
              <span>{image.title}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="container empty-state">
          <p>No photographs are available in this category yet. Please check back soon.</p>
        </div>
      )}

      {selectedImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title} onClick={() => setSelectedImage(null)}>
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close gallery view">
              ✕
            </button>
            <img src={selectedImage.image} alt={selectedImage.alt} />
            <div className="lightbox-copy">
              <p className="eyebrow">{selectedImage.category}</p>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="page-shell section">
      <div className="container section-header align-left">
        <p className="eyebrow">Services</p>
        <h1>Tailored photography experiences.</h1>
      </div>
      <div className="container service-grid detail-grid">
        {services.map((service) => (
          <article className="service-card detail-card" key={service.id}>
            <img src={service.image} alt={service.title} loading="lazy" />
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="card-actions">
                <a href={getWhatsAppUrl(`Hello, I am interested in the ${service.title} service.`)} className="button primary" target="_blank" rel="noreferrer">
                  Enquire
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PackagesPage() {
  return (
    <div className="page-shell section">
      <div className="container section-header align-left">
        <p className="eyebrow">Packages</p>
        <h1>Illustrative session packages.</h1>
      </div>
      <div className="container packages-grid">
        {packages.map((item) => (
          <article key={item.id} className="package-card">
            <div className="package-top">
              <p className="eyebrow">{item.label}</p>
              <h3>{item.name}</h3>
            </div>
            <div className="price-wrap">
              <span className="price">KES {item.price.toLocaleString()}</span>
              <span>{item.duration}</span>
            </div>
            <p>{item.description}</p>
            <ul>
              {item.inclusions.map((inclusion) => (
                <li key={inclusion}>{inclusion}</li>
              ))}
            </ul>
            {item.addOns && <p className="muted">Add-ons: {item.addOns}</p>}
            <Link to="/booking" className="button primary">Book this package</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page-shell section">
      <div className="container about-layout">
        <div>
          <p className="eyebrow">About</p>
          <h1>Thoughtful photography rooted in story, connection, and place.</h1>
          {aboutSections.map((section) => (
            <div key={section.title} className="copy-block">
              <h3>{section.title}</h3>
              <p>{section.content}</p>
            </div>
          ))}
        </div>

        <div className="photo-stack">
          <img src={galleryItems[1].image} alt={galleryItems[1].alt} />
          <div className="value-card">
            {studioValues.map((value) => (
              <div key={value.title}>
                <strong>{value.title}</strong>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: services[0].title,
    date: '',
    time: '',
    location: '',
    notes: '',
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.';
    if (!form.service.trim()) nextErrors.service = 'Please choose a service.';
    if (!form.date) nextErrors.date = 'Preferred date is required.';
    if (!form.consent) nextErrors.consent = 'Please confirm your consent for contact.';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus('Please correct the highlighted fields and try again.');
      return;
    }

    const enquiry = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.enquiries) || '[]');
    localStorage.setItem(STORAGE_KEYS.enquiries, JSON.stringify([enquiry, ...existing]));

    const waMessage = `Hello Evans Photography Studio, I would like to enquire about ${form.service}. My preferred date is ${form.date}${form.time ? ` at ${form.time}` : ''}. My name is ${form.name}. Phone: ${form.phone}. ${form.email ? `Email: ${form.email}.` : ''} Preferred location: ${form.location || 'Not specified'}. Notes: ${form.notes || 'No additional details'}.`;
    window.open(getWhatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');

    setStatus('Your enquiry was prepared in WhatsApp. No server-side booking system is configured yet, so this is the active fallback for delivery.');
    setForm({
      name: '',
      phone: '',
      email: '',
      service: services[0].title,
      date: '',
      time: '',
      location: '',
      notes: '',
      consent: false
    });
  };

  return (
    <div className="page-shell section">
      <div className="container booking-layout">
        <div>
          <p className="eyebrow">Booking</p>
          <h1>Request a photography session.</h1>
          <p className="soft-copy">Complete the form below and we will prepare your enquiry via WhatsApp as the current delivery fallback.</p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              <span>Full name</span>
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              {errors.name && <small>{errors.name}</small>}
            </label>
            <label>
              <span>Phone number</span>
              <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
              {errors.phone && <small>{errors.phone}</small>}
            </label>
            <label>
              <span>Email address</span>
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </label>
            <label>
              <span>Desired service</span>
              <select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>{service.title}</option>
                ))}
              </select>
              {errors.service && <small>{errors.service}</small>}
            </label>
            <label>
              <span>Preferred date</span>
              <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
              {errors.date && <small>{errors.date}</small>}
            </label>
            <label>
              <span>Preferred time</span>
              <input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} />
            </label>
            <label className="span-2">
              <span>Preferred location</span>
              <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
            </label>
            <label className="span-2">
              <span>Additional notes</span>
              <textarea rows="5" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
            </label>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} />
            <span>I consent to the studio using my contact details to respond to my enquiry.</span>
          </label>
          {errors.consent && <small>{errors.consent}</small>}

          {status && <div className="status-box">{status}</div>}

          <button type="submit" className="button primary full">Send enquiry</button>
        </form>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = `Hello Evans Photography Studio, I would like to get in touch. Name: ${form.name}. Email: ${form.email}. Message: ${form.message}`;
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    setStatus('Your message was opened in WhatsApp as the available contact fallback.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-shell section">
      <div className="container contact-layout">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Let’s start your story.</h1>
          <ul className="contact-list">
            <li><strong>Phone:</strong> <a href={`tel:${studioConfig.phone}`}>{studioConfig.phone}</a></li>
            <li><strong>Email:</strong> <a href={`mailto:${studioConfig.email}`}>{studioConfig.email}</a></li>
            <li><strong>Location:</strong> {studioConfig.location}</li>
            <li><strong>Hours:</strong> {studioConfig.hours}</li>
          </ul>
          <div className="button-row">
            <a href={getWhatsAppUrl('Hello Evans Photography Studio, I would like to enquire about your photography services and available booking dates.')} className="button primary" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </div>
          <div className="map-box">
            <p>Map directions are placeholder content until a verified studio address is confirmed.</p>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </label>
          <label>
            <span>Message</span>
            <textarea rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
          </label>
          {status && <div className="status-box">{status}</div>}
          <button type="submit" className="button primary full">Send message</button>
        </form>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="page-shell section legal-page">
      <div className="container narrow">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy notice</h1>
        <p>Evans Photography Studio collects only the information needed to respond to enquiries and manage bookings. This may include names, phone numbers, email addresses, preferred dates, services, and short notes related to your request.</p>
        <p>We use this information solely to respond to your enquiry, schedule a photography session, and communicate key details about the service you requested. We do not request unnecessary sensitive information.</p>
        <p>Forms are protected by validation and should only be used when consent is provided. Any data should be stored securely and accessed only by authorized staff. Demo data stored in the browser is for preview purposes only and should not be treated as a production database.</p>
      </div>
    </div>
  );
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('Set VITE_ADMIN_PASSWORD in your environment before publishing.');

  const handleSubmit = (event) => {
    event.preventDefault();
    const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD || '';

    if (!configuredPassword) {
      setNotice('No admin password has been configured yet. Configure VITE_ADMIN_PASSWORD and reload the page before enabling the live dashboard.');
      return;
    }

    if (password === configuredPassword) {
      localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify({ authenticated: true }));
      navigate('/admin');
    } else {
      setNotice('Invalid admin password.');
    }
  };

  return (
    <div className="page-shell section">
      <div className="container narrow admin-login-card">
        <p className="eyebrow">Admin</p>
        <h1>Secure access</h1>
        <p className="soft-copy">This dashboard is protected with server-side authorization in a production setup. The browser-only preview uses environment config and local session state.</p>
        <form onSubmit={handleSubmit} className="booking-form admin-login-form">
          <label>
            <span>Admin password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" />
          </label>
          {notice && <div className="status-box">{notice}</div>}
          <button type="submit" className="button primary full">Open dashboard</button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [bookings] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.enquiries) || '[]'));
  const [gallery] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.gallery) || JSON.stringify(galleryItems)));

  useEffect(() => {
    const adminState = JSON.parse(localStorage.getItem(STORAGE_KEYS.admin) || 'null');
    if (!adminState?.authenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = {
    totalImages: gallery.length,
    categories: new Set(gallery.map((item) => item.category)).size,
    newBookings: bookings.filter((item) => item.status === 'New').length,
    pending: bookings.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled').length
  };

  return (
    <div className="page-shell section admin-shell">
      <div className="container admin-header">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Studio overview</h1>
        </div>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEYS.admin);
            navigate('/admin/login');
          }}
        >
          Log out
        </button>
      </div>

      <div className="container stats-grid">
        <div className="stat-card"><strong>{stats.totalImages}</strong><span>Total portfolio images</span></div>
        <div className="stat-card"><strong>{stats.categories}</strong><span>Image categories</span></div>
        <div className="stat-card"><strong>{stats.newBookings}</strong><span>New booking enquiries</span></div>
        <div className="stat-card"><strong>{stats.pending}</strong><span>Pending enquiries</span></div>
      </div>

      <div className="container admin-panel">
        <h2>Recent booking enquiries</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length ? (
                bookings.slice(0, 6).map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No enquiries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
