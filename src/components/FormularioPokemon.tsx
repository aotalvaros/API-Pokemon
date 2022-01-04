import { Form, Formik } from "formik";
import "../styles/components/FormularioPokemon.css";
import { useEffect, useState } from "react";
import { obtenerPokemonAPI } from "../domain/obtenerPokemonAPI";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";
import { FormComponents } from "./utils/FormComponents";
import { FormTablePokemon } from "./utils/FormTablePokemon";
import { IPokemonState } from "../types/IPokemonState";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../actions/ui";

export const FormularioPokemon = () => {
  
  const dispatch = useDispatch();

  const [listadoPokemon, setListadoPokemon] = useState<IPokemonState[]>([]);

  const handleOnChange = ({ inputValor }: any) => {
    dispatch(startLoading());

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
            setListadoPokemon([...listadoPokemon, {
              id,
              name,
              base_experience,
              height,
              tipos,
              habilidades,
              sprites,
            }]);         
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
        dispatch(finishLoading());
      });
  };

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
              {
                (listadoPokemon.length !== 0 ) && <FormTablePokemon dataSource={listadoPokemon} />
              }             
            </Container>
          </>
        )}
        
      </Formik>
    </div>
  );
};
