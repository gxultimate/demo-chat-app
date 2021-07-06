import { Center, Flex, Icon, Tag, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

const MessageBox = ({ list, recipientName }) => {
    let session = JSON.parse(sessionStorage.getItem('user'))



    return (

        list.length !== 0 ? list.map(l =>
            <Flex bg='white' my={2} p={2} >
                <Flex flexDirection="column" width="100%">
                    <Tag
                        variant="subtle"
                        mb={2}
                        bg={l.sender === session._id ? "green" : "gray.500"}
                        color="white"
                        mr={l.sender === session._id ? undefined : "auto"}
                        ml={l.sender === session._id ? "auto" : undefined}

                    >
                        {recipientName && l.sender !== session._id ? recipientName : session.username}
                    </Tag>
                    <Flex
                        bg="gray.50"
                        pr={2}
                        py={2}
                        pl={4}
                        borderRadius={12}
                        boxShadow="0 2px 2px #0f0f0f0f"
                        ml={l.sender === session._id ? "auto" : undefined}
                        mr={l.sender === session._id ? undefined : "auto"}
                    >
                        <Text fontSize={15} maxWidth={400}>
                            {l?.message}
                        </Text>
                        <Flex
                            ml="auto"
                            mt="auto"
                            pl={4}
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            {l.sent ?
                                <>
                                    <Text fontSize={12} color="gray.500">
                                        {moment().format("hh:mm A")}
                                    </Text>
                                    {l.sender === session._id ? <Icon as='CheckIcon' fontSize={12} ml={2} color="gray.400" /> : ''}
                                </>
                                :
                                <>
                                    <Text fontSize={12} color="gray.500">
                                        {moment(l?.createdAt).format("hh:mm A")}
                                    </Text>
                                    {l.sender === session._id ?
                                        <Icon as='CheckIcon' fontSize={12} ml={2} color="green.400" />
                                        : ''}
                                </>
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        )
            :
            <Center>
                <Text fontSize="2xl">No Message</Text>
            </Center>


    )
}

export default MessageBox