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
    // block horizontal overflow at the top-level as well
    <main className="bg-black overflow-x-hidden">
      <BrandReels reels={REELS} />
    </main>
  );
}
