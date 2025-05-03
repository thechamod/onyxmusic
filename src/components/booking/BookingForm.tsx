import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFirebase } from '../../context/FirebaseContext';

const BookingForm: React.FC = () => {
  const { saveBooking } = useFirebase();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: 'recording',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await saveBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        service: formData.service,
        message: formData.message
      });
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        service: 'recording',
        message: ''
      });
    } catch (error) {
      console.error('Error saving booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderSubmitMessage = () => {
    if (submitStatus === 'success') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900/30 border border-green-700 text-green-200 p-4 rounded-md mb-6"
        >
          Your booking request has been submitted successfully! We'll contact you soon to confirm your session.
        </motion.div>
      );
    }
    
    if (submitStatus === 'error') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-md mb-6"
        >
          There was an error submitting your booking. Please try again or contact us directly.
        </motion.div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-display font-bold mb-6">Book Your Session</h3>
      
      {renderSubmitMessage()}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
            >
              <option value="recording">Recording Session</option>
              <option value="mixing">Mixing</option>
              <option value="mastering">Mastering</option>
              <option value="production">Full Production</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`button-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Book Session'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;