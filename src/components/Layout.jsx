import { Analytics } from "@vercel/analytics/react"
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
        <Analytics />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
