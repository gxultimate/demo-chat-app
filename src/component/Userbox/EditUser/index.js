import { Alert, AlertIcon, Button, FormControl, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import instance from '../../../axios'

const EditAccount = () => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [alert, setAlert] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    let session = JSON.parse(sessionStorage.getItem('user'))
    const register = () => {
        instance.patch(`/account/${session._id}`, {
            'username': username ? username : session.username,
            'password': password ? password : session.password
        }).then(res => {
            if (res.data) {
                setAlert(res.data)
                instance.get(`/contact/${session._id}`).then(res => {
                    sessionStorage.clear()
                    sessionStorage.setItem("user", JSON.stringify(res.data))
                })
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
                Edit Account
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />


                <ModalContent>
                    <ModalHeader>Edit Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {alert === true ? <Alert status="success" variant="subtle">
                            <AlertIcon />
                            Edit Account sucessfully
                        </Alert> : alert === false ? <Alert status="error" variant="subtle">
                            <AlertIcon />
                            Username existed
                        </Alert> : ''

                        }
                        <Grid rowGap='3'>
                            <GridItem>
                                <FormControl id="username">
                                    <Input placeholder="Username" defaultValue={session.username} onChange={username => setUsername(username.target.value)} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl id="password">
                                    <Input placeholder="Password" defaultValue={session.password} onChange={password => setPassword(password.target.value)} />
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


export default EditAccount