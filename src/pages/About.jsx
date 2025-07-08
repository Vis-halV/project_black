import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout>
            <div className="container mx-auto px-6 py-12 mt-[2rem]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-playfair text-3xl md:text-4xl font-medium mb-8">
                            For those who feel too much
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            In a world of curated perfection, we believe in the beauty of raw emotion.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <div className="text-center">
                            <h2 className="font-playfair text-2xl font-medium mb-6">Our Philosophy</h2>
                            <p className="text-gray-500 font-light leading-relaxed">
                                feltnotsaid was born from the understanding that some emotions are too complex, too raw, too beautiful to be captured in words alone. We are a sanctuary for authentic expression where vulnerability becomes art, and feelings find their visual voice.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 py-12">
                            <div>
                                <h3 className="font-playfair text-xl font-medium mb-4">Raw & Unfiltered</h3>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    No algorithms deciding what's worthy. No likes determining value. Just pure, honest emotional expression in its most authentic form.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-playfair text-xl font-medium mb-4">Visual Emotion</h3>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    Images carry what words cannot. Text overlays become poetry. Together, they create something entirely new feeling made visible.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-playfair text-xl font-medium mb-4">Anonymous by Design</h3>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    Share without judgment. Express without expectation. 
                                    Sometimes the most honest conversations happen in silence.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-playfair text-xl font-medium mb-4">Timeless by Nature</h3>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    Emotions are eternal. Our platform reflects this clean, minimal, 
                                    designed to let your feelings breathe and exist without distraction.
                                </p>
                            </div>
                        </div>

                        <div className="text-center py-12 border-t border-border">
                            <h2 className="font-playfair text-2xl font-medium mb-6">The Future of Feeling</h2>
                            <p className="text-gray-500 font-light leading-relaxed mb-8">
                                We're building a platform that recognizes your feelings, analyzes them, and helps you discover and connect with the emotions you're searching for among the crowd.
                            </p>
                            <p className="text-gray-500 font-light leading-relaxed">
                                But at our core, we'll always remain true to one principle: 
                                <em className="font-medium"> emotion over innovation</em>.
                            </p>
                        </div>

                        <div className="text-center">
                            <blockquote className="font-playfair text-xl italic text-gray-500">
                                “Your visions will become clear only when you can look into your own heart. <br />
                                Who looks outside, dreams; who looks inside, awakes.”
                            </blockquote>
                            <p className="text-sm text-gray-500 mt-4">  - Carl Gustav Jung</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
