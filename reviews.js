// scripts/fetch-reviews.js
const fs = require("fs");
const fetch = require("node-fetch"); // add node-fetch as a dev dep or use global fetch in newer node

async function main() {
  const placeId = process.env.PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!placeId || !apiKey) throw new Error("Missing PLACE_ID or GOOGLE_API_KEY");

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,reviews&key=${apiKey}`;
  const res = await fetch(url);
  const json = await res.json();

  // extract needed fields and sanitize
  const out = {
    fetched_at: new Date().toISOString(),
    name: json.result?.name || "",
    rating: json.result?.rating || null,
    reviews: (json.result?.reviews || []).map(r => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      relative_time_description: r.relative_time_description
    }))
  };

  fs.writeFileSync("src/_data/google-reviews.json", JSON.stringify(out, null, 2));
  console.log("Wrote src/_data/google-reviews.json");
}

main().catch(err => { console.error(err); process.exit(1); });
