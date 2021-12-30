import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../styles/components/FormularioPokemon.css'
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useEffect, useReducer, useState } from 'react'
import { obtenerPokemonAPI } from '../domain/obtenerPokemonAPI';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as Yup from "yup";
import {StyledTableCell, StyledTableRow, todoReducer} from '../components'
import { Col, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const FormularioPokemon = () => {

    const [state, dispatch] = useReducer(todoReducer, []);

    const [propiedadesPokemon, setPropiedadesPokemon] = useState({
        id: 0,
        name: '',
        base_experience: 0,
        height: 0,
        tipos: '',
        habilidades: '',
        sprites: {
            front_default: ''
        }
    });

    const handleOnChange = ({inputValor}: any) => {

        obtenerPokemonAPI(inputValor)
            .then(({ id, name, base_experience, height, types, abilities, sprites }) => {
                const tipos: string = types.map(type => type.type?.name).join(', ');
                const habilidades: string = abilities.map(abilities => abilities.ability?.name).join(', ');
                
                if(id === propiedadesPokemon.id || name === propiedadesPokemon.name){
                    Swal.fire({
                        icon: "info",
                        title: 'pokemon ya  existe',
                      });
                    return                    
                };

                setPropiedadesPokemon({
                    id, name, base_experience, height, tipos, habilidades, sprites
                }); 
                              
            }).catch((error) => {
                Swal.fire({
                    icon: "warning",
                    title: error,
                  });
            });
    };

    useEffect(() => {

        const action ={
            type: 'obtener',
            payload: propiedadesPokemon
        };

        dispatch(action);
        
    }, [propiedadesPokemon]);

    return (
        <div>
            <Formik
                initialValues={{
                    inputValor: ""
                }}
                onSubmit={(valor) =>{
                    handleOnChange(valor)
                }}
                validationSchema={Yup.object({
                    inputValor: Yup.string()
                    .required("Por favor ingrese un valor.")
                })}
            >
              {({ handleSubmit, errors, touched }) =>(
                <>
                    <Container>
                        <Form
                            noValidate
                            onSubmit={handleSubmit}
                        >
                        <Col className="columna">
                            <Field name="inputValor">
                            {({ field }: any) => (
                                <TextField
                                className="col-12 col-xs-12"                       
                                {...field}
                                type="text"
                                id="inputValor"
                                label="ID o Nombre del pokemon"
                                error={
                                    !!errors.inputValor &&
                                    touched.inputValor
                                }                               
                                />
                            )}
                            </Field>
                        </Col>
                            <ErrorMessage
                            className="error-message"
                            data-testid="errorinputValor"
                            name="inputValor"
                            component="span"
                            />
                        <Col className="columna">    
                            <Button type="submit" className="text-center" variant="contained">
                                    Obtener datos pokemon
                            </Button>
                        </Col>
                        </Form>

                        <TableContainer component={Paper} className='table'>
                            <Table sx={{ minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ids</StyledTableCell>
                                        <StyledTableCell align="right" >Nombre</StyledTableCell>
                                        <StyledTableCell align="right">Experiencia</StyledTableCell>
                                        <StyledTableCell align="right">Altura</StyledTableCell>
                                        <StyledTableCell align="right">Tipo</StyledTableCell>
                                        <StyledTableCell align="right">Habilidad</StyledTableCell>
                                        <StyledTableCell align="right">Avatar</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        state.filter((id: any) => id.id !== 0).map((propiedades: any) => (                                          
                                            <StyledTableRow 
                                                key={propiedades.id}
                                            >
                                                <StyledTableCell data-testid="ids_table" align="right"> {propiedades.id} </StyledTableCell>
                                                <StyledTableCell data-testid="name_table"align="right" > {propiedades.name}</StyledTableCell>
                                                <StyledTableCell data-testid="base_experience_table" align="right"> {propiedades.base_experience} </StyledTableCell>
                                                <StyledTableCell data-testid="height_table" align="right"> {propiedades.height} </StyledTableCell>
                                                <StyledTableCell data-testid="type_table" align="right" > {propiedades.tipos} </StyledTableCell>
                                                <StyledTableCell data-testid="ability_table" align="right"> {propiedades.habilidades}  </StyledTableCell>
                                                <StyledTableCell  align="right" >
                                                     <img
                                                        title="avatar_table"
                                                        alt=""
                                                        src={propiedades.sprites.front_default}
                                                    />                                               
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    }             
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                    
                </>
              )} 
            </Formik>
        </div>
    );
};
