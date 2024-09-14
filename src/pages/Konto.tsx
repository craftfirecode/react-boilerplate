import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../component/Button.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import { supabase } from "../supabaseClient.ts";
import { useSession } from "../context/useSession.tsx";

type FormData = {
  username: string;
  email?: string;
  password?: string;
};

const Konto = () => {
  const { session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [profileData, setProfileData] = useState<any>(null);
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

    const res = await supabase
      .from("profiles")
      .update({ username: formData.username })
      .eq("id", session.user.id);
    console.log("res:", res);

    if (res.status === 204) {
      checkUserProfile();
    } else {
      console.error("Fehler beim Aktualisieren des Profils:");
    }
  };

  const checkUserProfile = async () => {
    try {
      // API Call, um zu prüfen, ob die user_id in der Profile-Tabelle existiert
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();
      if (error && error.code === "PGRST116") {
        // PGRST116 steht für 'row not found'
        console.log("Profil nicht gefunden, erstelle ein neues Profil...");
        const { data: insertData, error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: session.user.id }]);

        if (insertError) {
          console.error("Fehler beim Einfügen:", insertError);
        } else {
          console.log("Profil erstellt:", insertData);
          setProfileData(insertData); // Füge das neue Profil in den State ein
          setFormData({ username: data.username });
        }
      } else if (data) {
        // Wenn die Zeile mit der user_id gefunden wurde, speichere sie im State
        console.log("Profil gefunden:", data);
        setProfileData(data);
        setFormData({ username: data.username });
      } else if (error) {
        console.error("Fehler beim Abrufen des Profils:", error);
      }
    } catch (err) {
      console.error("Fehler:", err);
    }
  };

  useEffect(() => {
    checkUserProfile();
  }, [session]); // Der Effekt wird ausgelöst, wenn sich die session ändert

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Username: {profileData?.username ?? "Kein Name"}</h1>
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
