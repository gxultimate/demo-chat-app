import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Button, Grid, GridItem, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from "react-router-dom";
import instance from '../../axios';
import EditAccount from './EditUser';

const Userbox = () => {
    let history = useHistory();
    let session = JSON.parse(sessionStorage.getItem('user'))
    let setOffline = () => {
        instance.post('/online', {
            '_id': session._id,
            'isOnline': false
        })
    }
    return (
        <GridItem colSpan={5} rowSpan={10} bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor='ButtonShadow'>

            <Grid gap={2} templateColumns="repeat(16, 1fr)" m='2'>
                <GridItem colSpan={1} rowSpan={1}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                </GridItem>
                <GridItem colSpan={4} rowSpan={1}>
                    <Text fontSize="3xl" >{session.username}</Text>
                </GridItem>
                <GridItem colSpan={11} rowSpan={1} ml='auto'>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <SettingsIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>  <EditAccount /></MenuItem>
                            <MenuItem onClick={() => {
                                setOffline(session._id)
                                history.push('/')
                            }} >
                                <Button colorScheme="red" size="xs">
                                    Logout
                                </Button>

                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
            </Grid>
        </GridItem>


    )
}

export default Userbox