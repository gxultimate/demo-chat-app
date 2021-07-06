import { Avatar, AvatarBadge, Box, Divider, Grid, GridItem, List, ListItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import AddContact from './AddContact'






const Contacts = ({ setContact, getMessages }) => {
    let [listOfContacts, setContactList] = useState([])
    let [currentContact, setCurrentContact] = useState({})
    let session = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {


        if (session.contacts.length !== listOfContacts.length) {
            session.contacts.map(c => {
                instance.get(`/contact/${c}`).then(res => {
                    setContactList(listOfContacts => [...listOfContacts, res.data])
                })
            })
        }


        setInterval(() => {

            if (currentContact._id !== undefined) {
                getMessages(session._id, currentContact._id, currentContact.username)
            }

        }, 3000);

    }, [])

    return (

        <Box>
            <Grid h="auto"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                margin='4'
                gap={2}>
                <GridItem colSpan={4} rowSpan={2}  >
                    <Text
                        bgGradient="linear(to-l, #6F5DEA,#7B4C9B)"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                    >
                        Contacts
                    </Text>
                </GridItem>
                <GridItem colSpan={1} rowSpan={2}  >
                    <Grid>
                        <GridItem>
                            <AddContact setContactList={setContactList} listOfContacts={listOfContacts} />
                        </GridItem>

                    </Grid>

                </GridItem>
                <GridItem rowSpan={2} colSpan={5} overflowY='scroll' height='450px' css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#353535',
                        borderRadius: '24px',
                    },
                }}>
                    <List spacing={3} color='black'>
                        {listOfContacts.length !== 0 ? listOfContacts.map((contact) => <ListItem key={contact._id} onClick={() => {
                            setContact(contact._id)
                            getMessages(session._id, contact._id, contact.username)
                            setCurrentContact(
                                {
                                    _id: contact._id,
                                    username: contact.username
                                })
                        }}>
                            <Grid gap={2} templateColumns="repeat(5, 1fr)">
                                <GridItem colSpan={1} rowSpan={1}>
                                    <Avatar>
                                        <AvatarBadge boxSize="1.25em" bg={contact.isOnline ? "green.500" : "tomato"} />
                                    </Avatar>

                                </GridItem>
                                <GridItem colSpan={4} rowSpan={1}>
                                    <Text fontSize="md" marginTop='.5em'>{contact.username}</Text>
                                </GridItem>
                                <GridItem colSpan={5} rowSpan={1}>
                                    <Divider orientation="horizontal" />
                                </GridItem>

                            </Grid>


                        </ListItem>) : ''}

                    </List>

                </GridItem>
            </Grid>
        </Box>
    )
}

export default Contacts