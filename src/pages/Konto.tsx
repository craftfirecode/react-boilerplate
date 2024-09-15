import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../component/Button.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import { supabase } from "../supabaseClient.ts";
import { useSession } from "../context/useSession.tsx";

type Profile = {
  id: string;
  username: string;
};

type FormData = {
  username: string;
};

const Konto = () => {
  const { session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    username: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: session.user.id,   // Nutze die user.id der Session für eindeutige Zuordnung
          username: formData.username,
        });

      if (error) {
        console.error("Fehler bei Upsert:", error);
      } else {
        console.log("Profil erfolgreich erstellt oder aktualisiert:", data);

        // Check if data exists and is an array
        if (data && Array.isArray(data) && (data as Profile[]).length > 0) {
          const profileData = data[0] as Profile;
          setFormData({ username: profileData.username }); // Setze den Benutzernamen im Formular
        }
      }
    } catch (err) {
      console.error("Fehler bei Upsert:", err);
    }
  };

  useEffect(() => {
    if (session) {
      const loadProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Fehler beim Laden des Profils:", error);
        } else if (data) {
          const profileData = data as Profile;
          setFormData({ username: profileData.username }); // Setze den initialen Benutzernamen im Formular
        }
      };

      loadProfile();
    }
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Username: {formData.username || ""}</h1>
      <Button onClick={() => toggleTheme()}>Switch Theme</Button>
      <Button variant="wow" onClick={() => toggleTheme()}>
        Switch Theme
      </Button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <button className="bg-black text-white px-3 py-1" type="submit">
          Update
        </button>
      </form>

      <div className="bg-red-200 p-[6px] rounded-md shadow">
        Currently Theme is {theme}
      </div>
    </div>
  );
};

export default Konto;
