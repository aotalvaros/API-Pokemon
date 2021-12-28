import axios, { AxiosError, AxiosResponse } from "axios";
import IPokemon  from "../types/IPokemon";

export const obtenerPokemonAPI = (valor: number | string): Promise<IPokemon> => {
   
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${valor}`)
        .then((response: AxiosResponse<any,IPokemon> ) => response.data ? response.data: "")
        .catch(resolverError);  ;
};

const resolverError = (error: AxiosError): Promise<string> => {
    console.log('Error consumiendo el servicio de obtener Pokemon por => ', error);  
    return Promise.reject('Error de conexion');   
};
