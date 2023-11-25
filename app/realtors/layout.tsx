import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-[100vw]">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </section>
  );  
}
