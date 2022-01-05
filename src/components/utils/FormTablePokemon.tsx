import { Paper } from '@material-ui/core'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { StyledTableCell, StyledTableRow } from '../../styles/utils/estilosTabla'

export const FormTablePokemon = ({dataSource}: any) => {
    return (
        <div>
            <TableContainer component={Paper} className='table__form-tablePokemon'>
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>id</StyledTableCell>
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
                            dataSource.filter((id: any) => id.id !== 0).map((propiedades: any) => (                                          
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
        </div>
    )
}
