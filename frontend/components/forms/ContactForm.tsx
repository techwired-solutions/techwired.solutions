'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service_type: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  requirements: z.string().min(50, 'Please provide at least 50 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  'Custom Web Application Development',
  'Mobile App Development (iOS & Android)',
  'Domain Registration & Hosting Management',
  'Graphics & Branding Design',
  'Promotional & Corporate Video Production',
  'Social Media Marketing & Post Boosting',
  '3D Animation & Motion Graphics',
  'SEO & Digital Strategy',
  'E-commerce Solutions',
  'API Development & Integrations',
  'Google Business Profile Optimization',
  'Full Digital Transformation Planning',
  'Others',
];

const budgetOptions = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,000',
  '$2,000 - $4,000',
  '$4,000+',
  'Custom Quote Required',
];


export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.post(`${apiUrl}/api/inquiry`, data);
      
      setSubmitStatus('success');
      reset();
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12 px-4 md:px-8 py-6"
      >

      {/* Messages */}
      {submitStatus === 'success' && (
        <motion.div
          className="bg-green-100 text-green-800 border-l-4 border-green-500 px-6 py-4 rounded-r-lg shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 font-bold">
             <span>✅</span> Message Received
          </div>
          <p className="text-sm mt-1 opacity-90">We'll get back to you within 24-48 hours.</p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
            className="bg-red-100 text-red-800 border-l-4 border-red-500 px-6 py-4 rounded-r-lg shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="flex items-center gap-2 font-bold">
               <span>❌</span> Error
            </div>
            <p className="text-sm mt-1 opacity-90">Something went wrong. Please try again.</p>
        </motion.div>
      )}

      {/* Group 1: Your Information */}
      <div className="space-y-8">
        <h3 className="text-sm font-semibold text-gray-400  tracking-wider border-b border-gray-300 pb-3">
            Your Information
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 group">
                <label htmlFor="name" className="text-sm font-bold text-gray-700 group-hover:text-[#0061ff] transition-colors">
                  Full Name *
                </label>
                <input
                {...register('name')}
                id="name"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-gray-900 focus:border-[#0061ff] focus:ring-4 focus:ring-[#0061ff]/10 transition-all shadow-sm group-hover:border-gray-300 outline-none"
                placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name.message}</p>}
            </div>

            <div className="space-y-3 group">
                <label htmlFor="phone" className="text-sm font-bold text-gray-700 group-hover:text-[#0061ff] transition-colors">
                  Phone Number
                </label>
                <input
                {...register('phone')}
                id="phone"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-gray-900 focus:border-[#0061ff] focus:ring-4 focus:ring-[#0061ff]/10 transition-all shadow-sm group-hover:border-gray-300 outline-none"
                placeholder="+977 98XXXXXXXX"
                />
            </div>
        </div>

        <div className="space-y-3 group">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 group-hover:text-[#0061ff] transition-colors">
              Email Address *
            </label>
            <input
            {...register('email')}
            id="email"
            type="email"
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-gray-900 focus:border-[#0061ff] focus:ring-4 focus:ring-[#0061ff]/10 transition-all shadow-sm group-hover:border-gray-300 outline-none"
            placeholder="john@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>}
        </div>
      </div>
      <br />
      {/* Group 2: Project Details */}
      <div className="space-y-8">
        <h3 className="text-sm font-semibold text-gray-400  tracking-wider border-b border-gray-300 pb-3">
            Project Details
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 group">
                <label htmlFor="service_type" className="text-sm font-bold text-gray-700 group-hover:text-[#0061ff] transition-colors">
                  I'm interested in... *
                </label>
                <div className="relative">
                   <select
                   {...register('service_type')}
                   id="service_type"
                   className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-gray-900 focus:border-[#0061ff] focus:ring-4 focus:ring-[#0061ff]/10 transition-all shadow-sm group-hover:border-gray-300 outline-none appearance-none cursor-pointer"
                   >
                   <option value="">Select Service</option>
                   {serviceOptions.map((opt) => (
                       <option key={opt} value={opt}>{opt}</option>
                   ))}
                   </select>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
                {errors.service_type && <p className="text-red-500 text-sm font-medium">{errors.service_type.message}</p>}
            </div>

            <div className="space-y-3 group">
                <label htmlFor="budget" className="text-sm font-bold text-gray-700 group-hover:text-[#0061ff] transition-colors">
                  Budget Range *
                </label>
                <div className="relative">
                   <select
                   {...register('budget')}
                   id="budget"
                   className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-gray-900 focus:border-[#0061ff] focus:ring-4 focus:ring-[#0061ff]/10 transition-all shadow-sm group-hover:border-gray-300 outline-none appearance-none cursor-pointer"
                   >
                   <option value="">Select Budget</option>
                   {budgetOptions.map((opt) => (
                       <option key={opt} value={opt}>{opt}</option>
                   ))}
                   </select>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
                {errors.budget && <p className="text-red-500 text-sm font-medium">{errors.budget.message}</p>}
            </div>
        </div>

        <div className="space-y-3 group">
            <label htmlFor="requirements" className="text-sm font-bold text-gray-700 group-hover:text-[#0061ff] transition-colors">
              Project Description *
            </label>
            <textarea
            {...register('requirements')}
            id="requirements"
            rows={5}
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-gray-900 focus:border-[#0061ff] focus:ring-4 focus:ring-[#0061ff]/10 transition-all shadow-sm group-hover:border-gray-300 outline-none resize-none"
            placeholder="Tell us about your goals, timeline, and any specific requirements..."
            />
            {errors.requirements && <p className="text-red-500 text-sm font-medium">{errors.requirements.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full py-5 text-lg font-bold shadow-lg shadow-[#0061ff]/20 hover:shadow-[#0061ff]/40 hover:-translate-y-1 transition-all"
      >
        {isSubmitting ? 'Sending Request...' : 'Send Message'}
      </Button>
    </form>
  
  );
  
}
