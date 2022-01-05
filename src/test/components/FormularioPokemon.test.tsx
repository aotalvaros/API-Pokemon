import '@testing-library/jest-dom';
import {  fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormularioPokemon } from '../../components/FormularioPokemon';
import { obtenerPokemonAPI } from '../../domain/obtenerPokemonAPI';
import { mockFunction } from '../../helpers/JestHelpers';
import IPokemon from '../../types/IPokemon';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../../domain/obtenerPokemonAPI');

describe('debe mostrar un formulario de Pokemon', () => {

    let obtenerPokemonAPIMock: any;

    const setUp = () => render(
        <>
        <Provider store={store}>
          <FormularioPokemon/>
        </Provider>
        </>
    );
    
    beforeAll(() => {
        obtenerPokemonAPIMock = mockFunction(obtenerPokemonAPI);
    });
   
    test('Debe mostrar las caracteristicas del pokemon y mostrarlos en una lista, cuando se llene el campo de texto y se le da click en el boton,', async() => {
  
        setUp();

        const respuestaAPI: IPokemon = {
            
            id: 35,
            name: 'clefairy',
            base_experience: 113,
            height:6,
            types:[
                {
                    type: {
                        name: 'fairy'
                    }
                }
            ],
            abilities:[
                {
                    ability:{
                        name: 'magic-guard'
                    }
                }
            ],
            sprites: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
            }
        }

        fireEvent.change(screen.getByLabelText(/ID o Nombre del pokemon/i), { target: { value: 'clefairy'}});      

        fireEvent.click(screen.getByRole('button', {name: /obtener datos pokemon/i}));

        obtenerPokemonAPIMock.mockResolvedValue(respuestaAPI);

        await waitFor(() => {
            expect(obtenerPokemonAPIMock).toHaveBeenCalled();
        })
        expect(screen.getByTestId("ids_table")).toHaveTextContent('35');
        expect(screen.getByTestId("name_table")).toHaveTextContent('clefairy');
        expect(screen.getByTestId("base_experience_table")).toHaveTextContent('113');
        expect(screen.getByTestId("height_table")).toHaveTextContent('6');
        expect(screen.getByTestId("type_table")).toHaveTextContent('fairy');
        expect(screen.getByTestId("ability_table")).toHaveTextContent('magic-guard');
        expect(screen.getByTitle(/avatar_table/i)).toHaveAttribute("src","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png");

    });

    test('Debe mostrar las caracteristicas del pokemon y mostrarlos en una lista, cuando se llene el campo de texto y se le da click en el boton, segunda prueba', async() => {
  
        setUp();

        const respuestaAPI: IPokemon = {
            
            id: 1,
            name: 'bulbasaur',
            base_experience: 64,
            height: 7,
            types:[
                {
                    type: {
                        name: 'grass'
                    }
                }
            ],
            abilities:[
                {
                    ability:{
                        name: 'overgrow'
                    }
                }
            ],
            sprites: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            }
        }

        fireEvent.change(screen.getByLabelText(/ID o Nombre del pokemon/i), { target: { value: 'bulbasaur'}});      

        fireEvent.click(screen.getByRole('button', {name: /obtener datos pokemon/i}));

        obtenerPokemonAPIMock.mockResolvedValue(respuestaAPI);

        await waitFor(() => {
            expect(obtenerPokemonAPIMock).toHaveBeenCalled();
        })
        expect(screen.getByTestId("ids_table")).toHaveTextContent('1');
        expect(screen.getByTestId("name_table")).toHaveTextContent('bulbasaur');
        expect(screen.getByTestId("base_experience_table")).toHaveTextContent('64');
        expect(screen.getByTestId("height_table")).toHaveTextContent('7');
        expect(screen.getByTestId("type_table")).toHaveTextContent('grass');
        expect(screen.getByTestId("ability_table")).toHaveTextContent('overgrow');
        expect(screen.getByTitle(/avatar_table/i)).toHaveAttribute("src","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");

    });
    
    test('debe el formulario tener validaciones de los campos que no sean vacios', async() => {
        setUp();
    await waitFor(() => {
      fireEvent.blur(screen.getByLabelText(/ID o Nombre del pokemon/i));
    });

        expect(screen.getByTestId("errorinputValor")).not.toBe(null);
        expect(screen.getByTestId("errorinputValor")).toHaveTextContent("Por favor ingrese un valor.");
    });

    test('si los campos estan vacios no debe sacar el error de campos vacios', () => {
        setUp();

        fireEvent.change(screen.getByLabelText(/ID o Nombre del pokemon/i), { target: { value: 'bulbasaur'}});

        expect(screen.queryByTestId("errorinputValor")).toBe(null);

    });    
    
});
