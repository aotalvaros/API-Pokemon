
import { searchMessageError } from '../../domain/searchMessageError';

describe('Encuentra un mensaje de error', () => {

    let errorCode: number;
    
    test('debe de mostrar un mensaje de error, cuando recibe un codigo', () => {
        errorCode = 404;
        expect(searchMessageError(errorCode)).toBe('El Pokemon no existe'); 
    });

    test('debe de mostrar un mensaje de error, cuando recibe un codigo, segunda prueba', () => {
        errorCode = 400;
        expect(searchMessageError(errorCode)).toBe('Ohh!, ocurrio un error, conexion inestable'); 
    });

    test('debe de mostrar un mensaje de error, cuando recibe un codigo, tercera prueba', () => {
        errorCode = 401;
        expect(searchMessageError(errorCode)).toBe('Es necesario que te autentiques para obtener el Pokemon');
    });

    test('debe de mostrar un mensaje de error, cuando recibe un codigo, cuarta prueba', () => {
        errorCode = 407;
        expect(searchMessageError(errorCode)).toBe('Ohh!, hubo un error, valida tu antivirus o el firewall, puede que esten bloquando la comunicacion');
    });

    test('debe de mostrar un mensaje de error, cuando recibe un codigo, quinta prueba', () => {
        errorCode = 414;
        expect(searchMessageError(errorCode)).toBe('Ups!, ocurrio un error inesperado, al parecer la uri es demasiado larga y el servidor no lo interpreta');
    });
    
    test('debe de mostrar un mensaje de error, cuando recibe un codigo, sexta prueba', () => {
        errorCode = 429;
        expect(searchMessageError(errorCode)).toBe('Ohh!, algo salio mal, al parecer estas realizando muchas peticiones demasiado rapidas');
    });

    test('debe de mostrar otro mensaje de error, si el codigo buscado no existe', () => {
        errorCode = 430;
        expect(searchMessageError(errorCode)).toBe('Ups!, ocurrio un error inesperado, intentalo nuevamente');
    });
})
