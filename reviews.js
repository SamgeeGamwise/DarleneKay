// reviews.js
const fs = require("fs");

async function main() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.PLACE_ID;

  if (!apiKey || !placeId) {
    throw new Error("Missing GOOGLE_API_KEY or PLACE_ID");
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
  const res = await fetch(url); // built-in fetch
  const data = await res.json();

  const out = {
    fetched_at: new Date().toISOString(),
    name: data.result?.name,
    rating: data.result?.rating,
    reviews: data.result?.reviews || []
  };

  fs.writeFileSync("src/_data/google-reviews.json", JSON.stringify(out, null, 2));
  console.log("✅ Reviews written to src/_data/google-reviews.json");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
