import { Alert, AlertIcon, Button, FormControl, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import instance from '../../../axios'



const AddContact = ({ setContactList, listOfContacts }) => {
    let [contact, setContact] = useState('')

    let [alert, setAlert] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const register = () => {
        let session = JSON.parse(sessionStorage.getItem('user'))
        instance.post('/contact', {
            '_id': session._id,
            'contact': contact
        }).then(res => {
            if (res.data) {
                instance.get(`/contact/${contact}`).then(res => setContactList(listOfContacts => [...listOfContacts, res.data]))
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
            <Button colorScheme="facebook" onClick={onOpen} >
                Add Contact
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />


                <ModalContent>
                    <ModalHeader>Add Contact</ModalHeader>
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
                                    <Input placeholder="ID" onChange={contact => setContact(contact.target.value)} />
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='facebook' onClick={() => register()}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default AddContact