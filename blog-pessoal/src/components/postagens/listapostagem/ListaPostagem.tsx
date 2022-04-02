import React, { useEffect, useState }  from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Postagem from '../../../models/Postagem';
import './ListaPostagem.css';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';

function ListaPostagem() {
    let history = useHistory();

        const [posts, setPosts] = useState<Postagem[]>([])

       const [token, setToken] = useLocalStorage("token");

       useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])

        async function getPost() {
        await busca(`/postagens/all`, setPosts, {
            headers: { "Authorization": token }
             
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