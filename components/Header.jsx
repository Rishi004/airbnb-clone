"use client";

import {
    Bars3Icon,
    GlobeAltIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { UserCircleIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function Header({ placeholder }) {
    const router = useRouter();

    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
    };

    const search = () => {
        const params = new URLSearchParams();
        params.append("location", searchInput);
        params.append("startDate", startDate.toISOString());
        params.append("endDate", endDate.toISOString());
        params.append("noOfGuests", noOfGuests);
        router.push(`/search?${params}`);
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };

    return (
        <header
            className="sticky top-0 z-50 grid grid-cols-3
         bg-white shadow-md p-5 md:px-10"
        >
            {/* Left */}
            <div
                onClick={() => router.push("/")}
                className="relative flex items-center h-10 cursor-pointer"
            >
                <Image
                    src="/assets/images/AirbnbLogo.png"
                    alt="airbnb-logo"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>
            {/* Middle - Search */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm ">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm
                     text-gray-600 placeholder-gray-400"
                    type="text"
                    placeholder={placeholder || "Start your search"}
                />
                <MagnifyingGlassIcon
                    className="hidden md:inline-flex h-8 bg-red-400
                 text-white rounded-full p-2 cursor-pointer md:mx-2"
                />
            </div>
            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                <div className="flex space-x-2 border-2 p-2 rounded-full">
                    <Bars3Icon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-5">
                    <DateRangePicker
                        showSelectionPreview={true}
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#fd5b61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>
                        <UsersIcon className="h-5" />
                        <input
                            value={noOfGuests}
                            onChange={(e) => setNoOfGuests(e.target.value)}
                            min={1}
                            type="number"
                            className="w-12 pl-2 text-lg outline-none text-red-400"
                        />
                    </div>
                    <div className="flex">
                        <button
                            className="flex-grow text-gray-500"
                            onClick={resetInput}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-grow text-red-400"
                            onClick={search}
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
