import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Initialer Abruf der Daten
      const { data: initialData, error } = await supabase
        .from('maps')
        .select('*');

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(initialData);
      }

      // Subscription zu den Datenänderungen
      const subscription = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "maps" },
          (payload) => {
            console.log("Change received!", payload);
            handleDataChange(payload);
          }
        )
        .subscribe();

      // Cleanup bei Unmount
      return () => {
        subscription.unsubscribe();
      };
    };

    // Fetch initial data und set up subscription
    fetchData();
  }, []);

  const handleDataChange = (payload: any) => {
    const { eventType, new: newData, old: oldData } = payload;

    setData((prevData) => {
      switch (eventType) {
        case 'INSERT':
          // Hinzufügen neuer Einträge
          return [...prevData, newData];

        case 'UPDATE':
          // Aktualisieren bestehender Einträge
          return prevData.map((item) => (item.id === newData.id ? newData : item));

        case 'DELETE':
          // Entfernen gelöschter Einträge
          return prevData.filter((item) => item.id !== oldData.id);

        default:
          return prevData;
      }
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <p>This is the Home page</p>
      <h1 className="my-10">Data from Supabase</h1>
      {data &&
        data.map((map: any) => (
          <div key={map.id}>
            <h1>{map.title}</h1>
            <p>{map.description}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
