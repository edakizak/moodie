import useSWR from "swr";
// import SearchBox from "../../components/SearchBox/SearchBox";

export default function Home() {
  const API_URL = "";
  const { data, error, isLoading } = useSWR(API_URL);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  console.log(data);

  return <div>hi</div>;
}
