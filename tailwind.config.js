/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [import("@tailwindcss/typography")],
  safelist: [
    // Dynamic color classes used in components
    // Background colors
    'bg-blue-50', 'bg-blue-100', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-900/20', 'bg-blue-900/30',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-900/20', 'bg-purple-900/30',
    'bg-green-50', 'bg-green-100', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-900/20', 'bg-green-900/30',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-900/20', 'bg-orange-900/30',
    'bg-red-50', 'bg-red-100', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-900/20', 'bg-red-900/30',
    'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-900/20', 'bg-indigo-900/30',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-900/20', 'bg-yellow-900/30',
    'bg-gray-50', 'bg-gray-100', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-900/20', 'bg-gray-900/30',
    
    // Text colors
    'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-600', 'text-blue-700', 'text-blue-800',
    'text-purple-200', 'text-purple-300', 'text-purple-400', 'text-purple-600', 'text-purple-700', 'text-purple-800',
    'text-green-200', 'text-green-300', 'text-green-400', 'text-green-600', 'text-green-700', 'text-green-800',
    'text-orange-200', 'text-orange-300', 'text-orange-400', 'text-orange-600', 'text-orange-700', 'text-orange-800',
    'text-red-200', 'text-red-300', 'text-red-400', 'text-red-600', 'text-red-700', 'text-red-800',
    'text-indigo-200', 'text-indigo-300', 'text-indigo-400', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800',
    'text-yellow-200', 'text-yellow-300', 'text-yellow-400', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800',
    'text-gray-200', 'text-gray-300', 'text-gray-400', 'text-gray-600', 'text-gray-700', 'text-gray-800',
    
    // Border colors
    'border-blue-300', 'border-blue-600',
    'border-purple-300', 'border-purple-600',
    'border-green-300', 'border-green-600',
    'border-orange-300', 'border-orange-600',
    'border-red-300', 'border-red-600',
    'border-indigo-300', 'border-indigo-600',
    'border-yellow-300', 'border-yellow-600',
    'border-gray-300', 'border-gray-600',
    
    // Gradient from/to colors
    'from-blue-50', 'from-blue-400', 'from-blue-900/20',
    'from-purple-50', 'from-purple-400', 'from-purple-900/20',
    'from-green-50', 'from-green-400', 'from-green-900/20',
    'from-orange-50', 'from-orange-400', 'from-orange-900/20',
    'from-red-50', 'from-red-400', 'from-red-900/20',
    'from-indigo-50', 'from-indigo-400', 'from-indigo-900/20',
    'from-yellow-50', 'from-yellow-400', 'from-yellow-900/20',
    'from-gray-50', 'from-gray-400', 'from-gray-900/20',
    
    'to-blue-100', 'to-blue-500', 'to-blue-800/20',
    'to-purple-100', 'to-purple-500', 'to-purple-800/20',
    'to-green-100', 'to-green-500', 'to-green-800/20',
    'to-orange-100', 'to-orange-500', 'to-orange-800/20',
    'to-red-100', 'to-red-500', 'to-red-800/20',
    'to-indigo-100', 'to-indigo-500', 'to-indigo-800/20',
    'to-yellow-100', 'to-yellow-500', 'to-yellow-800/20',
    'to-gray-100', 'to-gray-500', 'to-gray-800/20',
    
    // Completed lab border styling
    'border-green-200', 'border-green-700',
    'bg-green-50/30', 'bg-green-900/10',
  ]
};
