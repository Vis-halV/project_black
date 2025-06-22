import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Index = () => {
  const emotionalImages = [
    'https://images.unsplash.com/photo-1748792535033-8accf75a6e41?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1695642050530-c99d578408cf?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1525612172500-fc66ba177aaf?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1703441510949-2c8b69495b8f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1715959168006-91ded70a6339?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1703243052800-c547a0abe369?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1666041218336-dfee251a35af?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582036683423-8de19f37aa0e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1657706677957-e61f5381dff7?w=400&h=400&fit=crop'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-medium mb-8">
            felt, not said.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Express emotions visually. Upload images, overlay words, share raw feelings instead of conventional social posts.
          </p>
          <Link to="/create">
            <Button size="lg">Start Creating</Button>
          </Link>
        </div>
      </section>

      {/* Emotional Gallery Teaser */}
      <section className="py-20 px-6 bg-gray-100/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">
              Real. Unfiltered. Raw. 
            </h2>
            <p className="text-gray-500 font-light">See how others express what words cannot capture</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {emotionalImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Emotional expression ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-light tracking-wide">View feeling</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/explore">
              <Button variant="secondary">Explore All Feelings</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-8">
            For the ones who feel too much.
          </h2>
          <p className="text-gray-500 font-light leading-relaxed text-lg">
            In a world of curated perfection, we believe in the beauty of raw emotion. feltnotsaid is a sanctuary for authentic expression—where vulnerability becomes art, and feelings find their visual voice.
          </p>
          <div className="mt-8">
            <Link to="/about">
              <Button variant="ghost">Our Story</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
