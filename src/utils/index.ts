import { getAccionistas } from "../actions/accionistas.action";
import { IAccionista } from "../types";
import { IAccionista } from '../types/index';

export const isCompany = (name: string) => {

  name = name.toLowerCase();;
  name = name.split(".").join("");
  name = name.split(",").join("");
  name = name.split("-").join("");

  return name.includes("sas");
};

export const getNameInitials = (name: string) => {

  let nameArr = name.split(" ").map( (name: string) => name.charAt(0));
  nameArr = [...nameArr[0], ...nameArr[nameArr.length-1]];

  return nameArr.join("").toUpperCase();
};

export const generarColorRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red},${green},${blue})`;
};

export const authProcess = async (authUser: { docType: string, docNumber: number }) =>{
  try {
    
    const { data } = await getAccionistas();

    const user : IAccionista = data.find( (accionista: IAccionista) => {
      return accionista.TipoDocumento === authUser.docType && accionista.Documento === authUser.docNumber;
    });

    if (user) {

      sessionStorage.setItem("auth", JSON.stringify(user));

      location.href = "./"+ user.Documento;      
      return
    } else {
      return alert("El usuario no existe. Verifique sus credenciales");
    };


  } catch (err) {
    console.error(err);
  };
};

export const isLogged = async () : Promise<boolean> => {
  try {
    const authUser = JSON.parse(sessionStorage.getItem("auth")!);

    const { data } = await getAccionistas();

    const user = data.find( (accionista: IAccionista) => {
      return accionista.Nombre.toLocaleLowerCase() === authUser.Nombre.toLocaleLowerCase() && accionista.Documento === authUser.Documento;
    });

    if(user) return true; 

    return false;

  } catch (err) {
    console.error(err);
    return false;
  };
};

export const sortByPercentage = (data: IAccionista[]) =>{


  return data.sort( (a: IAccionista, b: IAccionista ) =>{

    const percentageA = +a.Porcentaje.split("%")[0];
    const percentageB = +b.Porcentaje.split("%")[0];

    if(percentageA > percentageB) {
      return 1;
    } else if (percentageA < percentageB) {
      return -1;
    } else {
      return 0
    };

  });
};