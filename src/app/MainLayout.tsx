import Footer from "./Footer";
import Nav from "./Nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
