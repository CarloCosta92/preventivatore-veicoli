import { useGlobalContext } from "../../context/GlobalContext";

export default function VehicleCard({vehicle}){

  const {setCurrentVehicle, currentVehicle} = useGlobalContext();
  const isSelected = currentVehicle && currentVehicle.id === vehicle.id;

    

    return <button onClick={()=>{
        setCurrentVehicle(vehicle);
  
    }} className={`vehicle-card ${isSelected && "border-4 border-primary"}`}>
                {/* 1. Immagine che riempie tutta la Card */}
                <img
                  src={vehicle.img}
                  alt={`${vehicle.brand} - ${vehicle.model}`}
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                />

                {/* 2. Overlay Scuro e Testo (Posizionato Assoluto) */}
                <div className="card-absolute-title">
                  <h5 className="text-xl font-bold">{vehicle.brand}</h5>
                  <h6 className="text-md font-medium text-gray-100">
                    {vehicle.model}
                  </h6>
                </div>
              </button>
}