const pageStyle = {
  paddingTop: '76px',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '6rem 1.5rem',
};

function PageStub({ title, subtitle }) {
  return (
    <main className="page-enter" style={pageStyle}>
      <p className="section-subtitle" style={{ marginBottom: '0.75rem' }}>{subtitle}</p>
      <h1 className="section-title">{title}</h1>
      <div className="gold-divider" style={{ margin: '1rem auto' }} />
      <p style={{ color: '#8C8279', fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem' }}>
        Content coming soon — Phase 2
      </p>
    </main>
  );
}

export function About() {
  return <PageStub title="About Us" subtitle="Our Story" />;
}

export function Products() {
  return <PageStub title="Our Products" subtitle="Premium Collection" />;
}

export function Services() {
  return <PageStub title="Our Services" subtitle="What We Offer" />;
}

export function Gallery() {
  return <PageStub title="Gallery" subtitle="Our Work" />;
}

export function Projects() {
  return <PageStub title="Projects" subtitle="Completed Works" />;
}

export function FAQs() {
  return <PageStub title="Frequently Asked Questions" subtitle="Help Center" />;
}

export function Contact() {
  return <PageStub title="Contact Us" subtitle="Get in Touch" />;
}

export function NotFound() {
  return (
    <main className="page-enter" style={{ ...pageStyle, background: 'linear-gradient(135deg, #F8F5F0 0%, #EDE7DC 100%)' }}>
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '8rem',
        fontWeight: 700,
        color: '#C9A84C',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>404</p>
      <h1 className="section-title" style={{ marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: '#8C8279', fontFamily: 'Inter, sans-serif', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a href="/" className="btn-primary">Return Home</a>
    </main>
  );
}
