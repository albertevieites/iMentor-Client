import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
