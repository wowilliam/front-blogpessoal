import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { UserState } from '../../../store/tokens/tokensReducer';

import Postagem from '../../../models/Postagem'
import { busca } from '../../../services/Service'

import './ListaPostagem.css'


function ListaPostagem() {

    let history = useHistory()
  
    const [posts, setPost] = useState<Postagem[]>([])
  
    const token = useSelector<UserState, UserState["tokens"]>(
      (state) => state.tokens
    )
  
    useEffect(() => {
      if (token === "") {
        alert("Você precisa estar logado")
        history.push("/login")
      }
    }, [token])
  
    async function getPost() {
      await busca("/postagens", setPost, {
        headers: {
          'Authorization': token
        }
      })
    }
  
    useEffect(() => {
        getPost()
      }, [posts.length])

    return (
        <>
        {    posts.map(posts => (
            <Box m={2} >
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Postagens
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {posts.titulo}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {posts.texto}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {posts.tema?.descricao}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5}>

                            <Link to={`/formularioPostagem/${posts.id}`} className="text-decorator-none" >
                                <Box mx={1}>
                                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                        atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to={`/deletarPostagem/${posts.id}`} className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" size='small' color="secondary">
                                        deletar
                                    </Button>
                                </Box>
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
            ))
        }
        </>
    );
}

export default ListaPostagem;