import { Box, Button, Center, Grid, GridItem, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import instance from '../../axios'
import Contact from '../Contact'
import MessageBox from '../MessageBox'
import Userbox from '../Userbox'

const ChatBox = () => {
    let [message, setMessage] = useState('')
    let [contact, setContact] = useState('')
    let [contactList, setContactList] = useState([])
    let [listOfMessages, setListOfMessages] = useState([])
    let [recipientId, setReciepientId] = useState('')
    let [recipientName, setRecipientName] = useState('')
    let session = JSON.parse(sessionStorage.getItem('user'))

    let sendMessage = () => {
        // instance.post('/message',)

        let messageDetail = {
            createdAt: moment().format(),
            message: message ? message : '',
            recipient: contact ? contact : '',
            sender: session._id,
            receiver: true,
            sent: false

        }
        setMessage('')
        instance.post('/message', messageDetail).then(res => res ? getMessages(session._id, recipientId) : '')
        // console.log(contact,message,"cc")
    }

    let getMessages = (sender, recipient, name) => {
        setReciepientId(recipient)
        setRecipientName(name)
        instance.get(`/message/${sender}/${recipient}`).then(res => res.data.length !== 0 ? setListOfMessages(res.data) : setListOfMessages([]))

    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [listOfMessages])

    return (

        <Center >
            <Box maxW="100vh" borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor='ButtonShadow' marginTop='20'>
                <Grid h="60vh"
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    margin="16px"
                    gap={2}>
                    <Userbox />
                    <GridItem rowSpan={2} colSpan={2} bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor='ButtonShadow' >
                        <Contact setContact={setContact} getMessages={getMessages} />
                    </GridItem>
                    <GridItem colSpan={3} rowSpan={2} borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor='ButtonShadow'  >
                        <Grid margin="8px">
                            <GridItem rowSpan={1} overflowY='scroll' height='450px' css={{
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
                            }} >
                                <MessageBox list={listOfMessages} recipientName={recipientName} />
                                <div ref={messagesEndRef} />
                            </GridItem>
                            <GridItem rowSpan={1}>
                                <InputGroup size="md">
                                    <Input
                                        value={message}
                                        pr="4.5rem"
                                        onChange={message => setMessage(message.target.value)}
                                        placeholder="Enter message"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={() => {
                                            sendMessage()

                                        }}>
                                            Send
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </GridItem>

                        </Grid>

                    </GridItem>
                </Grid>
            </Box>

        </Center>
    )
}

export default ChatBox