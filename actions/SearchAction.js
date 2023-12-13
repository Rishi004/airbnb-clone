"use server";

export async function getLocations() {
    try {
        const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS");
        return searchResults.json();
    } catch (error) {
        console.log(error);
    }
}
