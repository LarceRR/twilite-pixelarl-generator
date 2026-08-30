import { RouterProvider } from "react-router";
import { router } from "./providers/router";
import Navbar from "@/shared/ui/Navbar/Navbar";
import { ThemeProvider } from "@/shared/lib/theme/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
