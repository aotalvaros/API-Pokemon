
import { StyledEngineProvider } from "@mui/material";
import React from 'react';
import { Provider } from 'react-redux';
import { FormularioPokemon } from './components/FormularioPokemon';
import { store } from './store/store';
import './styles/styles.scss';

export default function App()  {    
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}> 
        <FormularioPokemon/>  
      </Provider> 
    </StyledEngineProvider>
  );
};

