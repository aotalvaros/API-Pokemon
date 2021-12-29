import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormularioPokemon } from '../../components/FormularioPokemon';
import { obtenerPokemonAPI } from '../../domain/obtenerPokemonAPI';
import { mockFunction } from '../../helpers/JestHelpers';


jest.mock('../../domain/obtenerPokemonAPI');

describe('debe mostrar un formulario de Pokemon', () => {

    let obtenerPokemonAPIMock: any;
    const setup = () => render(
        <>
          <FormularioPokemon/>
        </>
    );

    beforeAll(() => {
        obtenerPokemonAPIMock = mockFunction(obtenerPokemonAPI)
    })
   
    test('Cuando se llene el campo y se le da click al boton muestre las caracteristicas del pokemon', async() => {
  
        setup();

        const respuestaAPI = {
            data: {
                id: 35,
                name: 'clefairy',
                base_experience: 113,
                height:6,
                types:{
                    type: {
                        name: 'fairy'
                    }
                },
                abilities:{
                    ability:{
                        name: 'magic-guard'
                    }
                },
                sprites: {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/valor.png"
                }
            }
        }

        fireEvent.change(screen.getByLabelText(/ID o Nombre del pokemon/i), { target: { value: 'clefairy'}});      

        fireEvent.click(screen.getByRole('button', {name: /obtener datos pokemon/i}));

        obtenerPokemonAPIMock.mockResolvedValue(respuestaAPI);

        await waitFor(() => {
            expect(obtenerPokemonAPIMock).toHaveBeenCalled();
        })
    });
    
    
});
