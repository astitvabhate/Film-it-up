import BrandWorkVideoCard from "../../../components/BrandWorkVideoCard";

const REELS = [
  { id: "b1", src: "/collabration/yagaana.MP4", poster: "/collabration/thumbnails/yagaana.jpg", brand: "Yagaana", caption: "Product launch — 30s" },
  {id: "b2", src: "/collabration/hiranandani.mp4", poster: "/collabration/thumbnails/hiranandani.jpg", brand: "Hiranandani Groups", caption: "Interview series" },
  { id: "b3", src: "/collabration/ravi-gupta.MP4", poster: "/collabration/thumbnails/ravi-gupta.jpg", brand: "Ravi Gupta", caption: "Lifestyle spot" },
  {id: "b4", src: "/collabration/weedingpulao.mp4", poster: "/collabration/thumbnails/weedingPulao.jpg", brand: "Weeding Pulao", caption: "Interview series" },
  {id: "b5", src: "/collabration/Raagi.MP4", poster: "/collabration/thumbnails/raagi.jpg", brand: "Raagi", caption: "Interview series" },
  {id: "b6", src: "/collabration/shotstory.mp4", poster: "/collabration/thumbnails/shotstory.jpg", brand: "Shot Story", caption: "Interview series" },
  { id: "b7", src: "/collabration/kaviha.MP4", poster: "/collabration/thumbnails/kaviha.jpg", brand: "Kaviha", caption: "Behind the scenes" },
  {id: "b8", src: "/collabration/shreedhee.mp4", poster: "/collabration/thumbnails/shreedhee.jpg", brand: "Shreedhee", caption: "Interview series" },
  { id: "b9", src: "/collabration/corianderleaf.MP4", poster: "/collabration/thumbnails/corianderleaf.jpg", brand: "Coriander Leaf", caption: "Interview series" },
  { id: "b10", src: "/collabration/kaviha-2.MP4", poster: "/collabration/thumbnails/kaviha.jpg", brand: "Kaviha", caption: "Event coverage" },

  { id: "b11", src: "/collabration/tinkus.MP4", poster: "/collabration/thumbnails/tinkus.jpg", brand: "Tinkus", caption: "Interview series" },
  {id: "b12", src: "/collabration/Michelin tyres.MP4", poster: "/collabration/thumbnails/michelin.jpg", brand: "Michelin Tyres", caption: "Interview series" },
  { id: "b13", src: "/collabration/eskaywheels.MP4", poster: "/collabration/thumbnails/eskaywheels.jpg", brand: "Eskay Wheels", caption: "Lifestyle spot" },

];

export default function Page() {
  return (
    <main className="bg-black overflow-x-hidden">

      <section className="px-4 pb-8 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="border-t border-white/10 pt-8">
            <p className="text-[clamp(3rem,11vw,7.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-white">
              Work
              <br />
              Showcase
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-68 grid-cols-1 gap-10 sm:max-w-md sm:gap-16 lg:max-w-6xl lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {REELS.map((work) => {
              return (
                <article key={work.id} className="flex flex-col gap-3 sm:gap-5">
                  <div className="text-white lg:min-h-18">
                    <h2 className="max-w-[12ch] text-[1.35rem] font-bold uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-[2.15rem]">
                      {work.brand}
                    </h2>
                  </div>

                  <BrandWorkVideoCard src={work.src} poster={work.poster} title={work.brand} />
                </article>
              );
            })}
          </div>
        </div>
      </section>


    </main>
  );
}
