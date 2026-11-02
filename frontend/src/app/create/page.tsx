import Link from "next/link";

export default function Create() {
  return (
    <>
      <div className="container mx-auto px-6 py-12 mt-[2rem]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-3xl md:text-4xl font-medium mb-8">
              Create Your Visual Emotion
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-[2rem]">
              Share your feelings through images and text overlays.
              <br />
              This page is under construction, but we are excited to bring you this feature soon!            
            </p>
            <Link href="/contact" className="text-blue-500 hover:text-blue-700 underline">
              Support Us  
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
