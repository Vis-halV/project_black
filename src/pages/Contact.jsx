import Layout from '../components/Layout';
import Button from '../components/Button';

const Contact = () => {
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

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-3">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                required
                rows={6}
                className="w-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-light"
                placeholder="Share what's on your mind..."
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          <div className="mt-16 pt-8 border-t border-border text-center">
            <h2 className="font-playfair text-xl font-medium mb-4">Other Ways to Connect</h2>
            <div className="space-y-2 text-gray-500 font-light">
              <p>For enquiries: enquiry@feltnotsaid.com</p>
              <p>For partnerships: vishal@feltnotsaid.com</p>
              <p>For support: we're here for you</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
