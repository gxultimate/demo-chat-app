import { Alert, AlertIcon, Button, FormControl, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import instance from '../../axios'



const RegistrationForm = () => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [alert, setAlert] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const register = () => {
        instance.post('/register', {
            'username': username,
            'password': password
        }).then(res => {
            if (res.data) {
                setAlert(res.data)

                setTimeout(() => {
                    setAlert('')
                    onClose()
                }, 2000);
            }
            else {
                setAlert(res.data)
                setTimeout(() => {
                    setAlert('')
                    onClose()
                }, 2000);

            }
        })
    }



    return (
        <>
            <Button colorScheme="teal" size="xs" onClick={onOpen} >
                Register ?
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />


                <ModalContent>
                    <ModalHeader>Register</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {alert === true ? <Alert status="success" variant="subtle">
                            <AlertIcon />
                            Registered successfully
                        </Alert> : alert === false ? <Alert status="error" variant="subtle">
                            <AlertIcon />
                            User existed
                        </Alert> : ''

                        }
                        <Grid rowGap='3'>
                            <GridItem>
                                <FormControl id="username">
                                    <Input placeholder="Username" onChange={username => setUsername(username.target.value)} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl id="password">
                                    <Input placeholder="Password" onChange={password => setPassword(password.target.value)} />
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='facebook' onClick={() => register()}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default RegistrationForm