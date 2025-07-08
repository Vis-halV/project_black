
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Feelings' },
    { id: 'nostalgic', label: 'Nostalgic' },
    { id: 'hopeful', label: 'Hopeful' },
    { id: 'peace', label: 'Peace' },
    { id: 'sorrow', label: 'Sorrow' },
    { id: 'anxious', label: 'Anxious' }
  ];
  
  const mockPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1748792535033-8accf75a6e41?w=400&h=400&fit=crop',
      text: 'seeling light in the shadows of my mind',
      mood: ['hopeful'],
      author: 'Chola Rajan'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1695642050530-c99d578408cf?w=400&h=400&fit=crop',
      text: 'i miss the parts of me i’ve forgotten',
      mood: ['nostalgic'],
      author: 'Girishwar Misra'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1657706677957-e61f5381dff7?w=400&h=400&fit=crop',
      text: 'hope flickers even in the darkest alley',
      mood: ['hopeful','anxious'],
      author: 'S.K. Varma'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1703441510949-2c8b69495b8f?w=400&h=400&fit=crop',
      text: 'held together by fragments of forgotten',
      mood: ['hopeful'],
      author: 'Durganand Sinha'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1715959168006-91ded70a6339?w=400&h=400&fit=crop',
      text: 'some rides never get old',
      mood: ['nostalgic'],
      author: 'Rajendra K'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1703243052800-c547a0abe369?w=400&h=400&fit=crop',
      text: 'no brakes on childhood',
      mood: ['freedom'],
      author: 'Ashis Nandy'
    }
  ];
  

  const filteredPosts = activeFilter === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => Array.isArray(post.mood) && post.mood.includes(activeFilter));

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl md:text-4xl font-medium mb-4">
              Explore Feelings
            </h1>
            <p className="text-gray-500 font-light">
              Discover how others express what words cannot capture
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="text-xs"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id}
                className="group cursor-pointer hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={post.image}
                    alt={`Feeling by ${post.author}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <p className="text-white text-center font-light tracking-wide text-shadow">
                      {post.text}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-light">
                    by {post.author}
                  </p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-muted text-gray-500 rounded-full">
                    {Array.isArray(post.mood) ? post.mood.join(', ') : post.mood}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div>
              <div className="text-center py-20">
                <p className="text-gray-500 font-light mb-12">
                  No feelings found for this mood. Be the first to share.
                </p>
                <Link to="/create">
                  <Button variant="secondary">Let's Create</Button>
                </Link>
              </div>
              <div className="text-center ">
                
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;