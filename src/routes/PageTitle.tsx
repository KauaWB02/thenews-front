import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles: { [key: string]: string } = {
      "/": "Home - amage",
      "/about": "Sobre Nós - amage",
      "/services": "Serviços - amage",
      "/contact": "Contato - amage",
    };

    document.title = pageTitles[location.pathname] || "amage";
  }, [location]);

  return null; 
};

export default PageTitle;