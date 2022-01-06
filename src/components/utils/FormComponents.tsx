import { ErrorMessage, Field } from 'formik';
import { RootStateOrAny,  useSelector } from "react-redux";
import { SpinnerDotted } from 'spinners-react';
import { Button, Grid, TextField } from '@mui/material';

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
                            className='form__components-textField'
                            variant="outlined"                       
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
                        className='form__buttons-button form_buttons-primary'                    
                    >
                        Obtener datos pokemon
                    </Button>
                </Grid> 

                <Grid 
                    item xs={12}
                    className='form__components-grid'
                >
                    <SpinnerDotted 
                    size={50} thickness={100} speed={100} color="#216101" 
                    enabled={loading}/>
                </Grid>
            </Grid>
        </div>
    );
};
