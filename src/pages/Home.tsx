import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const data = async () => {
      const { data: maps, error, count } = await supabase.from("maps").select("*");

      if (error) {
        console.error("Error fetching notes:", error);
        return [];
      }
      setData(maps);
    };
    data();
  });

  return (
    <div>
      <h1>Home</h1>
      <p>This is the Home page</p>
      <h1 className="my-10">Data from Superbase</h1>
      {data && data.map((map: any) => (
        <div key={map.id}>
          <h1>{map.title}</h1>
          <p>{map.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
