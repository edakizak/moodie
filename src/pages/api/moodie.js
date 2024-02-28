export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { mood } = req.body;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  let genreId;
  switch (mood) {
    case "bored 😑":
      genreId = "28";
      break;
    case "sad 😞":
      genreId = "35";
      break;
    case "joyful 🥳":
      genreId = "16";
      break;
    case "curious 🧐":
      genreId = "12";
      break;
    case "dreamy 🫠":
      genreId = "14";
      break;
    case "rhythmic 🕺🏼":
      genreId = "10402";
      break;
    case "nostalgic 📜":
      genreId = "36";
      break;
    case "loving 🥰":
      genreId = "10749";
      break;
    case "familial 🧸":
      genreId = "10751";
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

// Action: Energized, Thrilled, Adventurous {"id":28,"name":"Action"} - bored
// Adventure: Curious, Wanderlust, Excited {"id":12,"name":"Adventure"
// Animation: Whimsical, Nostalgic, Joyful {"id":16,"name":"Animation"}
// Comedy: Happy, Light-hearted, Amused {"id":35,"name":"Comedy"} - sad
// Crime: Intrigued, Suspenseful, Edgy {"id":80,"name":"Crime"}
// Documentary: Inquisitive, Reflective, Engaged {"id":99,"name":"Documentary"}
// Drama: Emotional, Serious, Empathetic {"id":18,"name":"Drama"}
// Family: Familial, Caring, Comforting {"id":10751,"name":"Family"}
// Fantasy: Dreamy, Imaginative, Escapist {"id":14,"name":"Fantasy"}
// History: Reflective, Scholarly, Nostalgic {"id":36,"name":"History"}
// Horror: Scared, Fearful, Thrill-seeking {"id":27,"name":"Horror"}
// Music: Inspired, Rhythmic, Uplifted {"id":10402,"name":"Music"}
// Mystery: Curious, Puzzle-solving, Suspenseful {"id":9648,"name":"Mystery"}
// Romance: Loving, Amorous, Sentimental {"id":10749,"name":"Romance"}
// Science Fiction: Curious, Futuristic, Amazed {"id":878,"name":"Science Fiction"}
// Thriller: Tense, Nervous, Excited {"id":53,"name":"Thriller"}
