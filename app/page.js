import Banner from "@/components/Banner";
import Header from "@/components/Header";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";

async function getData() {
    const explore = await fetch("https://www.jsonkeeper.com/b/4G1G");
    const live = await fetch("https://www.jsonkeeper.com/b/VHHT");

    if (!explore.ok || !live.ok) throw new Error("Failed to fetch data");

    const exploreData = await explore.json();
    const liveData = await live.json();

    return { exploreData, liveData };
}

export default async function Page() {
    const { exploreData, liveData } = await getData();

    const updatedExploreData = exploreData.map((item) => {
        if (item.location === "Manchester") {
            return { ...item, img: "https://links.papareact.com/2k3" };
        }
        if (item.location === "Birkenhead") {
            return { ...item, img: "https://links.papareact.com/40m" };
        }
        return item;
    });

    return (
        <div>
            <Header />
            <Banner />

            <main className="max-w-7xl mx-auto px-8 sm:px-28">
                <section className="pt-6">
                    <h2 className="text-4xl font-semibold pb-5">
                        Explore Nearby
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {updatedExploreData?.map(
                            ({ img, location, distance }) => {
                                return (
                                    <SmallCard
                                        key={img}
                                        img={img}
                                        location={location}
                                        distance={distance}
                                    />
                                );
                            }
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-4xl font-semibold py-8">
                        Live Anywhere
                    </h2>
                    <div className="flex space-x-3 overflow-x-scroll">
                        {liveData?.map(({ img, title }) => {
                            return (
                                <MediumCard key={img} img={img} title={title} />
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
