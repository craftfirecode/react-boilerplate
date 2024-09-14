import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useSession } from "../context/useSession";

const Home = () => {
  const { session } = useSession(); 
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: superData, error } = await supabase.from("maps").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return [];
      }
      setData(superData);
    };

    fetchData();
  }, []); // Add empty dependency array to run the effect only once


  useEffect(() => {
    const createUserProfile = async () => {
      if (session) {
        const { error } = await supabase.rpc("create_user_profile", {
          user_id: session?.user.id,
        });

        if (error) {
          console.error("Error creating user profile:", error);
        } else {
          console.log("User profile created successfully");
        }
      }
    };

    createUserProfile();
  }, [session]); 

  return (
    <div>
      <h1>Home</h1>
      <p>This is the Home page</p>
      <h1 className="my-10">Data from Supabase</h1>
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
