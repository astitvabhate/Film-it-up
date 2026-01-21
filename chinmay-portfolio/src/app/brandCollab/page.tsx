import BrandReels from "../../../components/BrandReels";

const REELS = [
  { id: "b1", src: "/collabration/brand1.MP4", poster: "/images/chinmay.jpg", brand: "Brand A", caption: "Product launch — 30s" },
  { id: "b2", src: "/collabration/brand2.MP4", poster: "/images/chinmay.jpg", brand: "Brand B", caption: "Lifestyle spot" },
  { id: "b3", src: "/collabration/brand3.MP4", poster: "/images/chinmay.jpg", brand: "Brand C", caption: "Behind the scenes" },
  { id: "b4", src: "/collabration/brand4.MP4", poster: "/images/chinmay.jpg", brand: "Brand D", caption: "Event coverage" },
  { id: "b5", src: "/collabration/brand5.MP4", poster: "/images/chinmay.jpg", brand: "Brand E", caption: "Interview series" },
  { id: "b6", src: "/collabration/brand6.MP4", poster: "/images/chinmay.jpg", brand: "Brand F", caption: "Interview series" },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="film-grain absolute inset-0 opacity-[0.07]" />
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-4 tracking-tight">
            Selected Works
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            A curated collection of brand collaborations and commercial projects.
            Showcasing products and stories through a cinematic lens.
          </p>
        </div>

        {/* The Grid Component */}
        <BrandReels reels={REELS} />
      </div>
    </main>
  );
}
