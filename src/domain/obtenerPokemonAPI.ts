import axios, { AxiosError, AxiosResponse } from "axios";
import IPokemon  from "../types/IPokemon";
import { searchMessageError } from "./searchMessageError";

export const obtenerPokemonAPI = (valor: number | string): Promise<IPokemon> => {
   
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${valor}`)
        .then((response: AxiosResponse<IPokemon> ) => response.data)
        .catch(resolverError);
};

const resolverError = (error:  AxiosError): Promise<IPokemon> => {
    console.log('Error consumiendo el servicio de obtener Pokemon por => ', error);
    return Promise.reject(searchMessageError(error.response?.status));       
};


