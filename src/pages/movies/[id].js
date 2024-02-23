// // pages/movies/[id].js
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import MovieDetailsMore from "../../../components/MovieDetailsMore/MovieDetailsMore";
// import Comments from "../../../components/Comments/Comments";
// import NewComment from "../../../components/Comment/NewComment";

// export default function DetailsMore() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [movieDetailsMore, setMovieDetailsMore] = useState(null);
//   const [comments, setComments] = useState([]);

//   console.log(id);

//   const fetchMovieDetailsMore = async (movieId) => {
//     if (!movieId) return;
//     const response = await fetch(`/api/movie/${movieId}`);
//     const data = await response.json();
//     setMovieDetailsMore(data);
//   };

//   const fetchComments = async (movieId) => {
//     if (!movieId) return;
//     const response = await fetch(`/api/comments/${movieId}`);
//     const data = await response.json();
//     setComments(data);
//   };

//   useEffect(() => {
//     if (id) {
//       fetchMovieDetailsMore(id);
//       fetchComments(id);
//     }
//   }, [id]);

//   console.log("movieDetailsMore", movieDetailsMore);
//   console.log("comments", comments);

//   const addComment = async (commentText, movieId, name = "Anonymous") => {
//     // POST isteği ile yeni yorumu backend'e gönder
//     const response = await fetch(`/api/comments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         comment: commentText,
//         movieId,
//       }),
//     });

//     if (response.ok) {
//       const newComment = await response.json();
//       // Yorum listesini güncelle
//       setComments([...comments, newComment]);
//     } else {
//       // Hata yönetimi: İsteğin başarısız olması durumunda kullanıcıya bilgi ver
//       console.error("Yorum eklenemedi");
//     }
//   };

//   if (!movieDetailsMore) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <MovieDetailsMore movie={movieDetailsMore} />
//       <Comments comments={comments} />
//       <NewComment addComment={addComment} movieId={id} />
//     </div>
//   );
// }

// pages/movies/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieDetailsMore from "../../../components/MovieDetailsMore/MovieDetailsMore";
import Comments from "../../../components/Comments/Comments";
import NewComment from "../../../components/Comment/NewComment";

export default function DetailsMore() {
  const router = useRouter();
  const { id } = router.query;
  const [movieDetailsMore, setMovieDetailsMore] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const fetchMovieDetailsMore = async (movieId) => {
    try {
      if (!movieId) return;
      const response = await fetch(`/api/movie/${movieId}`);
      if (!response.ok) throw new Error("Movie details could not be fetched.");
      const data = await response.json();
      setMovieDetailsMore(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchComments = async (movieId) => {
    try {
      if (!movieId) return;
      const response = await fetch(`/api/comments/${movieId}`);
      if (!response.ok) throw new Error("**Comments could not be fetched.");
      const data = await response.json();
      console.log(data);
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    console.log("id--------", typeof id);
    fetchMovieDetailsMore(id);
    fetchComments(id);
  }, [id]);

  const addComment = async (commentText, movieId, name = "Anonymous") => {
    try {
      const response = await fetch(`/api/comments/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          comment: commentText,
          movieId,
        }),
      });
      if (!response.ok) throw new Error("Failed to add comment.");
      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movieDetailsMore) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MovieDetailsMore movie={movieDetailsMore} />
      <Comments comments={comments} />
      <NewComment addComment={addComment} movieId={id} />
    </div>
  );
}
