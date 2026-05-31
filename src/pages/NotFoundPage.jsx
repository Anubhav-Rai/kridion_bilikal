import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="mx-auto max-w-md py-24 text-center">
    <p className="eyebrow mb-3">404</p>
    <h1 className="text-2xl font-normal text-ink">Page not found</h1>
    <p className="mt-3 text-sm leading-relaxed text-muted">
      We couldn&apos;t find the page you were looking for.
    </p>
    <Link to="/" className="btn btn-outline mt-8 px-6">
      Back to Products
    </Link>
  </div>
);

export default NotFoundPage;
