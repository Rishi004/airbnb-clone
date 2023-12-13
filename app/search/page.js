"use client";

import { getLocations } from "@/actions/SearchAction";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import MapBox from "@/components/MapBox";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const location = searchParams.get("location");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const noOfGuests = searchParams.get("noOfGuests");

    const formattedStartDate = format(new Date(startDate), "dd MMM yyyy");
    const formattedEndDate = format(new Date(endDate), "dd MMM yyyy");

    const rangeDate = `${formattedStartDate} - ${formattedEndDate}`;

    const [searchResults, setSearchResults] = useState();

    const placeholder = `${location} | ${rangeDate} | ${noOfGuests} Guests`;

    const getAllLocations = async () => {
        const results = await getLocations();
        setSearchResults(results);
    };

    useEffect(() => {
        getAllLocations();
    }, []);

    return (
        <div>
            <Header placeholder={placeholder} />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">
                        300+ Stays - {rangeDate} - for {noOfGuests} guests
                    </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">
                        Stays in {location}
                    </h1>
                    <div
                        className="hidden lg:inline-flex mb-5 space-x-3
                    text-gray-800 whitespace-nowrap"
                    >
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>

                    <div className="flex flex-col">
                        {searchResults?.map(
                            ({
                                img,
                                location,
                                title,
                                description,
                                star,
                                price,
                                total
                            }) => {
                                return (
                                    <InfoCard
                                        key={img}
                                        img={img}
                                        location={location}
                                        title={title}
                                        description={description}
                                        star={star}
                                        price={price}
                                        total={total}
                                    />
                                );
                            }
                        )}
                    </div>
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <MapBox searchResults={searchResults} />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Page;
