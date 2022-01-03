import { Form, Formik } from "formik";
import "../styles/components/FormularioPokemon.css";
import { useEffect, useReducer, useState } from "react";
import { obtenerPokemonAPI } from "../domain/obtenerPokemonAPI";
import * as Yup from "yup";
import { todoReducer } from "../components";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";
import { FormComponents } from "./utils/FormComponents";
import { FormTable } from "./utils/FormTable";
import { IPokemonState } from "../types/IPokemonState";
import { IAction } from "../types/IPokemonReducer";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../actions/ui";


export const FormularioPokemon = () => {
  const dispatchLoading = useDispatch();

  const [listadoPokemon, dispatch] = useReducer(todoReducer, []);

  const [propiedadesPokemon, setPropiedadesPokemon] = useState<IPokemonState>({
    id: 0,
    name: "",
    base_experience: 0,
    height: 0,
    tipos: "",
    habilidades: "",
    sprites: {
      front_default: "",
    },
  });

  const handleOnChange = ({ inputValor }: any) => {
    dispatchLoading(startLoading());

    obtenerPokemonAPI(inputValor)
      .then(
        ({ id, name, base_experience, height, types, abilities, sprites }) => {
          const tipos: string = types.map((type) => type.type?.name).join(", ");
          const habilidades: string = abilities
            .map((abilities) => abilities.ability?.name)
            .join(", ");

          const esRepetido: boolean = listadoPokemon.some(
            (PokemonData: IPokemonState) =>
              PokemonData.id === id || PokemonData.name === name
          );

          if (esRepetido) {
            Swal.fire({
              icon: "info",
              title: "pokemon ya  existe",
            });
          } else {
            setPropiedadesPokemon({
              id,
              name,
              base_experience,
              height,
              tipos,
              habilidades,
              sprites,
            });
          }
        }
      )
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: error,
        });
      })
      .finally(() => {
        dispatchLoading(finishLoading());
      });
  };

  useEffect(() => {
    const action: IAction = {
      type: "obtener",
      payload: propiedadesPokemon,
    };

    dispatch(action);
  }, [propiedadesPokemon]);
  

  return (
    <div>
      <Formik
        initialValues={{
          inputValor: "",
        }}
        onSubmit={(valor) => {
          handleOnChange(valor);
        }}
        validationSchema={Yup.object({
          inputValor: Yup.string().required("Por favor ingrese un valor."),
        })}
      >
        {({ handleSubmit, errors, touched }) => (
          <>
            <Container maxWidth="xl">
                
              <Form noValidate onSubmit={handleSubmit}>

                <div className="container-form">               
                  <FormComponents
                    errors={errors}
                    touched={touched}
                    className="btn-obtenerPokemon"
                  />
                </div>

              </Form>

              <FormTable dataSource={listadoPokemon} />
            </Container>
          </>
        )}
        
      </Formik>
    </div>
  );
};
