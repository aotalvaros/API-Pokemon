import { Field, Form, Formik } from 'formik';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import React from 'react'
import { obtenerPokemonAPI } from '../domain/obtenerPokemonAPI';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const FormularioPokemon = () => {

    const handleOnChange = ({inputValor}: any) => {
      
        const resp = obtenerPokemonAPI(inputValor);

        console.log(resp);
        
    }

    return (
        <div>
            <Formik
                initialValues={{
                    inputValor: ""
                }}
                onSubmit={(valor) =>{
                    handleOnChange(valor)
                }}
            >
              {({handleSubmit, errors, touched}) =>(
                  <>
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                    
                    <Field name="inputValor">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12"                       
                          {...field}
                          type="text"
                          id="inputValor"
                          label="ID o Nombre del pokemon"
                        //   error={
                        //     !!errors.inputPrimerNombre &&
                        //     touched.inputPrimerNombre
                        //   }
                        />
                      )}
                    </Field>

                    <Button type="submit" className="text-center" variant="contained">
                            obtener datos pokemon
                    </Button>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell align="right">name</TableCell>
                                    <TableCell align="right">base_experience</TableCell>
                                    <TableCell align="right">height</TableCell>
                                    <TableCell align="right">type</TableCell>
                                    <TableCell align="right">ability</TableCell>
                                    <TableCell align="right">avatar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
          
                            </TableBody>
                         </Table>
                    </TableContainer>

                    </Form>
                  </>
              )} 

            </Formik>
        </div>
    );
};
