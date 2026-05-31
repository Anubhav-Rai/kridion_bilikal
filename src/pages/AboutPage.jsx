import React from 'react';
import anubhavImage from '../assets/anubhav.jpeg';

const STATS = [
  ['2023', 'Founded'],
  ['2,500+', 'Happy customers'],
  ['150+', 'Cities served'],
  ['50+', 'Products'],
];

const REASONS = [
  ['Premium quality', 'Handpicked products with rigorous quality checks.'],
  ['Artisan support', 'Supporting traditional craftsmen and farmers.'],
  ['Pan-India delivery', 'Fast and secure shipping nationwide.'],
  ['Fresh products', 'Made to order for maximum freshness.'],
];

const CATEGORIES = [
  ['🪵', 'Wooden kitchenware', 'Handcrafted chopping boards, serving platters, and kitchen tools made from premium teak and sheesham wood with food-safe finishes.'],
  ['🌶️', 'Premium spices', 'Farm-fresh elaichi (cardamom), black pepper, cinnamon, and other authentic Indian spices processed in small batches.'],
  ['🫒', 'Mustard oil & more', 'Cold-pressed mustard oil (khali), sesame oil, and other traditional cooking oils prepared using time-tested methods.'],
];

const AboutPage = () => (
  <div className="space-y-16">
    <section className="max-w-2xl">
      <p className="eyebrow mb-3">Our Story</p>
      <h1 className="text-2xl font-normal leading-snug text-ink sm:text-3xl">
        From a family kitchen to homes across India
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Premium wooden kitchenware, authentic spices, and traditional mustard oil — crafted with care
        and delivered nationwide.
      </p>
    </section>

    <section className="grid gap-8 border-t border-line pt-12 md:grid-cols-[200px_1fr]">
      <div>
        <img src={anubhavImage} alt="Anubhav Rai, Founder of KRIDION Agro" className="aspect-square w-full object-cover" />
        <p className="mt-3 text-sm text-ink">Anubhav Rai</p>
        <p className="text-xs text-muted">Founder &amp; CEO</p>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <h2 className="text-base font-medium text-ink">About KRIDION Agro</h2>
        <p>
          Founded in 2023, KRIDION Agro emerged from a passion for preserving traditional Indian kitchen
          practices while meeting modern quality standards. What started as a small venture by the Rai
          family in Bengaluru has grown into a trusted name for authentic kitchen essentials.
        </p>
        <p>
          We specialize in handcrafted wooden chopping boards made from sustainable teak and sheesham wood,
          premium spices sourced directly from farms, and cold-pressed mustard oil prepared using
          century-old traditional methods.
        </p>
        <p>
          Our wooden products are crafted by skilled artisans who have worked with wood for generations.
          Each piece is carefully selected, seasoned, and finished to ensure durability and food safety.
        </p>
      </div>
    </section>

    <section className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2">
      <div>
        <h3 className="text-sm font-medium tracking-wide text-ink">Our Mission</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          To bring authentic, high-quality kitchen essentials to every Indian home while supporting
          traditional artisans and sustainable farming practices.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium tracking-wide text-ink">Our Vision</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          To become India&apos;s most trusted brand for traditional kitchen products while preserving our
          culinary heritage for future generations.
        </p>
      </div>
    </section>

    <section className="border-t border-line pt-12">
      <p className="eyebrow mb-6">By the numbers</p>
      <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
        {STATS.map(([value, label]) => (
          <div key={label}>
            <dt className="text-2xl font-normal text-ink">{value}</dt>
            <dd className="mt-1 text-xs text-muted">{label}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section className="border-t border-line pt-12">
      <p className="eyebrow mb-2">Why choose us</p>
      <ul className="divide-y divide-line">
        {REASONS.map(([title, desc]) => (
          <li key={title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <span className="text-sm text-ink">{title}</span>
            <span className="text-sm text-muted sm:max-w-md sm:text-right">{desc}</span>
          </li>
        ))}
      </ul>
    </section>

    <section className="border-t border-line pt-12">
      <p className="eyebrow mb-6">Product categories</p>
      <div className="grid gap-8 sm:grid-cols-3">
        {CATEGORIES.map(([emoji, title, desc]) => (
          <div key={title}>
            <div className="grid aspect-[4/3] place-items-center bg-sub text-4xl">{emoji}</div>
            <h4 className="mt-3 text-sm text-ink">{title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default AboutPage;
