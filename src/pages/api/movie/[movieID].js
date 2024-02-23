export default async function handler(request, response) {
  const { movieID } = request.query;

  if (request.method === "GET") {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`;
    const movie = await fetch(url);
    const details = await movie.json();

    response.status(200).json(details);
  }
}
