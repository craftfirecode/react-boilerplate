import { Button } from "../component/Button.tsx";
import { useTheme } from "../context/ThemeContext.tsx";

const Konto = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
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