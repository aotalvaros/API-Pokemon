import { ErrorMessage, Field } from 'formik';
import React from 'react'
import { Col } from 'react-bootstrap';
import { Button, TextField } from "@material-ui/core";
import '../../styles/components/FormularioPokemon.css';

export const FormComponents = ({ errors, touched }: any) => {
    return (
        <div>
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
            <Col className="columna">
                <ErrorMessage
                className="error-message"
                data-testid="errorinputValor"
                name="inputValor"
                component="span"
                />
            </Col>
            <Col className="columna">    
                <Button type="submit" color='primary' variant="contained">
                    Obtener datos pokemon
                </Button>
            </Col>
        </div>
    )
}
