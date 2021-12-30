import axios, { AxiosError, AxiosResponse } from "axios";
import IPokemon  from "../types/IPokemon";

export const obtenerPokemonAPI = (valor: number | string): Promise<IPokemon> => {
   
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${valor}`)
        .then((response: AxiosResponse<IPokemon> ) => response.data)
        .catch(resolverError);
};

const resolverError = (error:  AxiosError): Promise<IPokemon> => {
    console.log('Error consumiendo el servicio de obtener Pokemon por => ', error);
    return Promise.reject(hashMapMessageError(error.response?.status));       
};

const hashMapMessageError = (error: any) => {

    let valorError: string = '';
    let errorCode: Map<number,string> = new Map([
        [400, 'Ohh!, hay un error, conexion inestable'],
        [401, 'Es necesario que te autentiques para obtener el Pokemon'],
        [404, 'El Pokemon no existe'],
        [407, 'Ohh!, hubo un error, valida tu antivirus o el firewall, puede que esten bloquando la comunicacion'],
        [414, 'Ups!, ocurrio un error inesperado, al parecer la uri es demasiado larga y el servidor no lo interpreta'],
        [429, 'Ohh!, algo salio mal, al parecer estas realizando muchas peticiones demasiado rapidas'],
    ]);
    
    if (errorCode.has((error))) {
        errorCode.forEach((value: string, key: number) => {
          if (key === error) {
            valorError = value
          } 
        });
     }else{
         valorError = 'Ups!, ocurrio un error inesperado, intentalo nuevamente'
     };

    return valorError
};

const switchMessageError = (error: any) => {
    switch (error) {
        case 400:
            return Promise.reject('Ohh!, hay un error, conexion inestable');
        case 401:
            return Promise.reject('Es necesario que te autentiques para obtener el Pokemon'); 
        case 404:
            return Promise.reject('El Pokemon no existe');
        case 407:
            return Promise.reject('Ohh!, hubo un error, valida tu antivirus o el firewall, puede que esten bloquando la comunicacion');
        case 414:
            return Promise.reject('Ups!, ocurrio un error inesperado, al parecer la uri es demasiado larga y el servidor no lo interpreta');
        case 429:
            return Promise.reject('Ohh!, algo salio mal, al parecer estas realizando muchas peticiones demasiado rapidas');   
        default:
            return Promise.reject('Ups!, ocurrio un error inesperado, intentalo nuevamente');
    };
}
