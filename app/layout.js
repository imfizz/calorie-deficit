import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <header style={{ padding: "10px", background: "#eee" }}>
            <h1>Calorie Tracker</h1>
            <nav>
              <a href="/dashboard">Dashboard</a> |{" "}
              <a href="/profile">Profile</a> |{" "}
              <a href="/macros">Macros</a> |{" "}
              <a href="/foodlog">Food Log</a>
            </nav>
          </header>
          <main style={{ padding: "20px" }}>{children}</main>
          <footer style={{ padding: "10px", background: "#eee", marginTop: "20px" }}>
            <p>© 2026 Calorie Tracker</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}