
export const searchMessageError = (errorCode: any ): string => {

    let valorError: any;
    let apiErrors: Map<number,string> = new Map([
        [400, 'Ohh!, ocurrio un error, conexion inestable'],
        [401, 'Es necesario que te autentiques para obtener el Pokemon'],
        [404, 'El Pokemon no existe'],
        [407, 'Ohh!, hubo un error, valida tu antivirus o el firewall, puede que esten bloquando la comunicacion'],
        [414, 'Ups!, ocurrio un error inesperado, al parecer la uri es demasiado larga y el servidor no lo interpreta'],
        [429, 'Ohh!, algo salio mal, al parecer estas realizando muchas peticiones demasiado rapidas'],
    ]);
    
    if (apiErrors.has((errorCode))) {        
        valorError = apiErrors.get(errorCode);
     }else{
         valorError = 'Ups!, ocurrio un error inesperado, intentalo nuevamente'
     };

    return valorError
};