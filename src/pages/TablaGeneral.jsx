import React, {useState} from "react"; 
import PreciosDeReferencia from "../components/tables/preciosDeReferencia";
import CostosSilaje from "../components/tables/costosSilaje";
import CostoMS from "../components/tables/costoMS";
import CostoTransporte from "../components/tables/costosTransporte";
import NavEconomics from "../components/navEconomics";

export default function TablaGeneral(){

  const [activeTab, setActiveTab] = useState("reference");
  
    const renderContent = () => {
      switch (activeTab) {
        case "reference":
          return <PreciosDeReferencia />;
        case "silage":
          return <CostosSilaje />;
        case "ms":
          return <CostoMS />;
        case "transport":
          return <CostoTransporte />;
        default:
          return <PreciosDeReferencia />;
      }
    };
    return (
      <div>
      {/* Menú de navegación */}
      <NavEconomics activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tablas dinámicas */}
      <div style={{ marginTop: "1rem" }}>{renderContent()}</div>
    </div>
    );
}