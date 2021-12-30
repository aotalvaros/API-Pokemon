import  axios, { AxiosError, AxiosResponse, AxiosStatic } from 'axios';
import { obtenerPokemonAPI } from '../../domain/obtenerPokemonAPI';
import IPokemon from '../../types/IPokemon';

jest.mock('axios');

describe('debe construir un formulario de Pokemon', () => {
    let mockedAxios: jest.Mocked<AxiosStatic>

    beforeEach(() => {
        mockedAxios = axios as jest.Mocked<typeof axios>;
        jest.resetAllMocks();     
    });
   
    test('debe obtener las caracteristicas del Pokemon, con el id', (done) => {

        const valor: number | string = 35;
  
        const mockedResponse: AxiosResponse<IPokemon> = {
            config: {},
            data: {
                id: valor,
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
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/valor.png"
                }
            },
            headers: {},
            status: 200,
            statusText: 'OK'
        };  

        mockedAxios.get.mockResolvedValue(mockedResponse);

        obtenerPokemonAPI(valor)
            .then(({ id, name, base_experience, height, types, abilities, sprites }: IPokemon) => {
                expect(mockedAxios.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${valor}`)
                expect(id).toEqual(valor);
                expect(name).toBe('clefairy');
                expect(base_experience).toEqual(113);
                expect(height).toEqual(6);
                expect(types).toEqual([{
                    type: {
                        name: 'fairy'
                    }
                }]);
                expect(abilities).toEqual([{
                    ability:{
                        name: 'magic-guard'
                    }
                }]);
                expect(sprites).toEqual({
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/valor.png"
                });

                done();
            });
        
    });

    test('debe obtener las caracteristicas del Pokemon, con el nombre', (done) => {

        const valor: number | string = 'clefairy';
  
        const mockedResponse: AxiosResponse<IPokemon> = {
            config: {},
            data: {
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
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/valor.png"
                }
            },
            headers: {},
            status: 200,
            statusText: 'OK'
        };  

        mockedAxios.get.mockResolvedValue(mockedResponse);

        obtenerPokemonAPI(valor)
            .then(({ id, name, base_experience, height, types, abilities, sprites }: IPokemon) => {
                expect(mockedAxios.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${valor}`)
                expect(id).toEqual(35);
                expect(name).toBe(valor);
                expect(base_experience).toEqual(113);
                expect(height).toEqual(6);
                expect(types).toEqual([{
                    type: {
                        name: 'fairy'
                    }
                }]);
                expect(abilities).toEqual([{
                    ability:{
                        name: 'magic-guard'
                    }
                }]);
                expect(sprites).toEqual({
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/valor.png"
                });

                done();
            });
        
    });

    test('debe devolver un error', async() => {
        const responseError: AxiosError = {
            config: {},
            isAxiosError: false,
            name: "Error",
            message: "Network Error",
            toJSON: jest.fn()
        };

        mockedAxios.get.mockRejectedValue(responseError);

        await expect(obtenerPokemonAPI(10000)).rejects.toEqual('Pokemon no existe');
    });
    
});
