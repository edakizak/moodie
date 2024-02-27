export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { mood } = req.body;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  let genreId;
  switch (mood) {
    case "bored":
      genreId = "28";
      break;
    case "sad":
      genreId = "35";
      break;
    default:
      return res.status(400).json({ error: "Invalid mood provided." });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();

  res.status(200).json(data.results);
}

// Action: Energized, Thrilled, Adventurous
// Adventure: Curious, Wanderlust, Excited
// Animation: Whimsical, Nostalgic, Joyful
// Comedy: Happy, Light-hearted, Amused
// Crime: Intrigued, Suspenseful, Edgy
// Documentary: Inquisitive, Reflective, Engaged
// Drama: Emotional, Serious, Empathetic
// Family: Familial, Caring, Comforting
// Fantasy: Dreamy, Imaginative, Escapist
// History: Reflective, Scholarly, Nostalgic
// Horror: Scared, Fearful, Thrill-seeking
// Music: Inspired, Rhythmic, Uplifted
// Mystery: Curious, Puzzle-solving, Suspenseful
// Romance: Loving, Amorous, Sentimental
// Science Fiction: Curious, Futuristic, Amazed
// Thriller: Tense, Nervous, Excited
// TV Movie: Relaxed, Homey, Comfortable
// War: Sober, Reflective, Intense
// Western: Rugged, Nostalgic, Independent
