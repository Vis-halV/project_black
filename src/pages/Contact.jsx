import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Generate custom doc ID: first 4 letters of name (lowercase, no spaces) + timestamp
      const namePart = formData.name.replace(/\s+/g, '').toLowerCase().slice(0, 4) || 'anon';
      const timestampPart = Date.now();
      const docId = `${namePart}_${timestampPart}`;

      const contactRef = doc(db, 'contacts', docId);
      await setDoc(contactRef, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp()
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      if (error.code === 'permission-denied') {
        setErrorMessage('Unable to submit form due to permission restrictions. Please contact support.');
      } else if (error.code === 'unavailable') {
        setErrorMessage('Service temporarily unavailable. Please try again in a few moments.');
      } else if (error.message && error.message.includes('Firebase')) {
        setErrorMessage('Connection error. Please check your internet connection and try again.');
      } else {
        setErrorMessage('Failed to send message. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl md:text-4xl font-medium mb-4">
              Reach Out
            </h1>
            <p className="text-gray-500 font-light">
              Have something to share? We're here to listen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-3">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-light"
                placeholder="Your name (or how you'd like to be known)"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-light"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-light"
                placeholder="Share what's on your mind..."
              />
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 mb-4">
                <p className="font-medium">Thank you for reaching out!</p>
                <p className="text-sm">We feel you, and we'll respond soon.</p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 mb-4">
                <p className="font-medium">Unable to send message</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          <div className="mt-16 pt-8 border-t border-border text-center">
            <h2 className="font-playfair text-xl font-medium mb-4">Other Ways to Connect</h2>
            <div className="space-y-2 text-gray-500 font-light">
              <p>For enquiries: <a href="mailto:enquiry@feltnotsaid.com" className="text-accent hover:underline">enquiry@feltnotsaid.com</a></p>
              <p>For partnerships: <a href="mailto:vishal@feltnotsaid.com" className="text-accent hover:underline">vishal@feltnotsaid.com</a></p>
              <p>For support: <a href="mailto:support@feltnotsaid.com" className="text-accent hover:underline">support@feltnotsaid.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
