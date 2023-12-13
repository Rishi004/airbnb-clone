/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["links.papareact.com"]
    },
    env: {
        mapbox_key:
            "pk.eyJ1IjoicmlzaGkwMDQiLCJhIjoiY2xxMjQxeHRyMDA5MDJpcHEwMHR6d2ZncSJ9.bARSei0ueJtl8hSgJ1-ZtQ"
    }
};

module.exports = nextConfig;
