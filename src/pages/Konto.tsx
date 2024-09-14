import { useEffect, useState } from "react";
import { Button } from "../component/Button.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import { supabase } from "../supabaseClient.ts";
import { useSession } from "../context/useSession.tsx";

const Konto = () => {
  const { session } = useSession(); 
  const { theme, toggleTheme } = useTheme();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        // API Call, um zu prüfen, ob die user_id in der Profile-Tabelle existiert
        let { data, error } = await supabase
          .from('profiles')
          .select('*')
          .single();
        if (error && error.code === 'PGRST116') { // PGRST116 steht für 'row not found'
          console.log('Profil nicht gefunden, erstelle ein neues Profil...');
          const { data: insertData, error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: session.user.id}]);

          if (insertError) {
            console.error('Fehler beim Einfügen:', insertError);
          } else {
            console.log('Profil erstellt:', insertData);
            setProfileData(insertData); // Füge das neue Profil in den State ein
          }
        } else if (data) {
          // Wenn die Zeile mit der user_id gefunden wurde, speichere sie im State
          console.log('Profil gefunden:', data);
          setProfileData(data);
        } else if (error) {
          console.error('Fehler beim Abrufen des Profils:', error);
        }
      } catch (err) {
        console.error('Fehler:', err);
      }
    };

    checkUserProfile();
  }, [session]); // Der Effekt wird ausgelöst, wenn sich die session ändert

  if(!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>full_name: {profileData?.full_name ?? 'Kein Name'}</h1>
      <Button onClick={() => toggleTheme()}>Switch Theme</Button>
      <Button variant="wow" onClick={() => toggleTheme()}>
        Switch Theme
      </Button>

      <div className="bg-red-200 p-[6px] rounded-md shadow">
        Currently Theme is {theme}
      </div>
    </div>
  );
};

export default Konto;