import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Query parameter
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=1`;
  try {
    const tmdbResponse = await fetch(url);
    const tmdbData = await tmdbResponse.json();
    res.status(200).json(tmdbData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
