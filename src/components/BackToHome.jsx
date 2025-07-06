import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackToHome = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 mb-4 text-blue-600 hover:underline font-medium"
  >
    <ArrowLeft size={18} />
    Back to Home
  </button>
);

export default BackToHome;
