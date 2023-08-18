import axios from "../http/httpRequest";

const path = "accionistas";

export const getAccionistas = async () => await axios.get(path);
