import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Patients() {
    const [csvData, setCsvData] = useState(null);
    const { setNotification } = useStateContext();
    const inputFileRef = useRef(null);
    const navigate = useNavigate();
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith(".csv")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                setCsvData(text);
            };
            reader.readAsText(file);
            // Enviamos el archivo CSV al servidor
            const formData = new FormData();
            formData.append("csvFile", file, file.name);
            axiosClient
                .post("/upload-csv-patients", formData, {})
                .then(() => {
                    setNotification("Archivo cargado correctamente");
                    navigate("/dashboard");
                })
                .catch((err) => {
                    setNotification(
                        "Error al cargar el archivo, revise la estructura del CSV"
                    );
                    const response = err.response;
                    if (response && response.status === 400) {
                        setErrors(response.data.errors);
                    }
                    inputFileRef.current.value = null;
                });
        } else {
            alert("Por favor seleccione un archivo CSV.");
        }
    };
    return (
        <div>
          <h1>Carga de pacientes</h1>
            <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileUpload}
                accept=".csv"
            />
        </div>
    );
}
