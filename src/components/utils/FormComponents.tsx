import { ErrorMessage, Field } from 'formik';
import React from 'react'
import { Button, Grid, TextField } from "@material-ui/core";
import { RootStateOrAny,  useSelector } from "react-redux";
import { SpinnerDotted } from 'spinners-react';

export const FormComponents = ({ errors, touched }: any) => {
    
    const { loading } = useSelector( (state: RootStateOrAny) => state.ui );
    
    return (
        <div>
            <Grid>
                <Grid item xs={12}>
                    <Field name="inputValor">
                    {({ field }: any) => (
                        <TextField                  
                        {...field}                       
                        type="text"
                        id="inputValor"                       
                        label="ID o Nombre del pokemon"
                        error={
                            !!errors.inputValor &&
                            touched.inputValor
                        } 
                        style={{ 
                            margin: '5px',
                            width: '234px'
                        }}                       
                        />
                    )}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <ErrorMessage
                    className="form__components-error-message"
                    data-testid="errorinputValor"
                    name="inputValor"
                    component="span"
                    />
                </Grid>  
                
                <Grid item xs={12} style={{ marginTop: '10px'}}>
                    <Button 
                        type="submit"
                        color='primary' 
                        variant="contained"                        
                    >
                        Obtener datos pokemon
                    </Button>
                </Grid> 

                <Grid item xs={12} 
                    style={{ 
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <SpinnerDotted 
                        size={50} thickness={100} speed={100} color="#36ad47" 
                        enabled={loading}/>
                </Grid>
            </Grid>
        </div>
    );
};
