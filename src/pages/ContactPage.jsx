import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Spinner from '../components/ui/Spinner';
import { useToast } from '../context/ToastContext';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/broadbandarchitecture@gmail.com';
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

const DETAILS = [
  ['Phone', ['+91 7027851317', '+91 87654 32109']],
  ['Email', ['info@kridion.com', 'orders@kridion.com']],
  ['Address', ['Plot No. 45, Industrial Area', 'Jodhpur, Rajasthan 342001', 'India']],
  ['Hours', ['Mon–Sat: 9:00 AM – 6:00 PM', 'Sun: 10:00 AM – 4:00 PM']],
];

const FAQ = [
  ['What is your minimum order quantity?', "For retail customers there's no minimum order. For bulk orders, discounts start from 10+ pieces of the same product."],
  ['Do you ship internationally?', 'Currently we ship only within India. International shipping is coming soon — contact us for updates.'],
  ['How do you ensure product quality?', 'All products undergo strict quality checks. Wooden items are food-grade treated, and spices are tested for purity and freshness.'],
  ['What is your return policy?', 'We offer 7-day returns for damaged products. Custom wooden items are returnable only for quality issues.'],
];

const ContactPage = () => {
  const toast = useToast();
  const [formData, setFormData] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New Contact Form Submission from KRIDION Agro Website',
          _captcha: 'false',
          ...formData,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      toast.success("Thank you! We've received your inquiry and will reply within 24 hours.");
      setFormData(EMPTY);
    } catch {
      toast.error('Failed to send your message. Please try again, or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+917027851317';
  };
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I am interested in your products from KRIDION Agro.');
    window.open(`https://wa.me/917015431317?text=${message}`, '_blank', 'noopener');
  };

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Questions about our products or need a bulk order? We're here to help."
      />

      <div className="grid gap-12 border-t border-line pt-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className="label">Full Name *</label>
              <input id="c-name" name="name" type="text" value={formData.name} onChange={handleChange} required className="field" placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="c-email" className="label">Email Address *</label>
              <input id="c-email" name="email" type="email" value={formData.email} onChange={handleChange} required className="field" placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="c-phone" className="label">Phone</label>
              <input id="c-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="field" placeholder="+91 7027851317" />
            </div>
            <div>
              <label htmlFor="c-subject" className="label">Subject *</label>
              <select id="c-subject" name="subject" value={formData.subject} onChange={handleChange} required className="field">
                <option value="">Select a subject</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="bulk-order">Bulk Order</option>
                <option value="quality-concern">Quality Concern</option>
                <option value="partnership">Partnership</option>
                <option value="general">General Question</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="c-message" className="label">Message *</label>
            <textarea id="c-message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="field resize-none" placeholder="Tell us about your requirements…" />
          </div>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting && <Spinner size={16} className="text-paper" />}
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>

        {/* Info */}
        <div className="space-y-8">
          <div className="divide-y divide-line border-y border-line">
            {DETAILS.map(([label, lines]) => (
              <div key={label} className="flex gap-6 py-4">
                <span className="w-20 flex-shrink-0 text-xs uppercase tracking-wide text-muted">{label}</span>
                <div className="space-y-0.5 text-sm text-ink">
                  {lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <button type="button" onClick={handleCallNow} className="btn btn-outline w-full">Call Now</button>
            <button type="button" onClick={handleWhatsApp} className="btn btn-outline w-full">WhatsApp Us</button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-16 border-t border-line pt-12">
        <p className="eyebrow mb-6">Frequently asked questions</p>
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <h3 className="text-sm text-ink">{q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
