import { Alert, AlertIcon, Button, Center, FormControl, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import instance from '../../axios';
import RegistrationForm from '../Register';


const LoginForm = (props) => {
    let history = useHistory();
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [alert, setAlert] = useState('')

    const login = () => {
        instance.post('/login', {
            'username': username,
            'password': password
        }).then(res => {

            if (res.data !== false) {
                instance.post('/online', {
                    '_id': res._id,
                    'isOnline': true
                })
                sessionStorage.setItem("user", JSON.stringify(res.data))
                setAlert(res.data)
                setTimeout(() => {
                    setAlert('')
                    history.push('/chatbox')
                }, 1500);
            }
            else {
                setAlert(res.data)
                setTimeout(() => {
                    setAlert('')
                }, 2000);

            }
        })
    }

    return (
        <Center bgGradient="linear(to-l, #F0F0F0, #FFFFF)" h="100vh">
            <Grid rowGap='3' >

                <GridItem>
                    <Center>
                        <Text
                            bgGradient="linear(to-l, #6F5DEA,#7B4C9B)"
                            bgClip="text"
                            fontSize="2xl"
                            fontWeight="extrabold"
                        >
                            KaiTalk
                        </Text>

                    </Center>

                </GridItem>
                <GridItem>
                    {alert === true ? <Alert status="success" variant="subtle">
                        <AlertIcon />
                        Login successfully
                    </Alert> : alert === false ? <Alert status="error" variant="subtle">
                        <AlertIcon />
                        Wrong credentials
                    </Alert> : ''

                    }
                </GridItem>
                <GridItem textAlign='center' >
                    <FormControl id="username">
                        <Input placeholder="Username" onChange={username => setUsername(username.target.value)} />
                    </FormControl>

                </GridItem>
                <GridItem>
                    <FormControl id="password">
                        <Input type='password' placeholder="Password" onChange={password => setPassword(password.target.value)} />
                    </FormControl>

                </GridItem>
                <GridItem>
                    <Button colorScheme='messenger' isFullWidth={true} onClick={() => login()}>Submit</Button>
                </GridItem>
                <GridItem>
                    <RegistrationForm />
                </GridItem>
            </Grid>


        </Center>)
}


export default LoginForm