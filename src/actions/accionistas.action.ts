import Http from '../http';
import { Accionista } from '../types';

const path : string = '/accionistas';

const http = new Http<Accionista>(path);

export const getAccionistasData = async () : Promise<Accionista[] | undefined > => await http.get();