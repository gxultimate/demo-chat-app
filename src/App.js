// import {SocketContext, socket} from './socket'
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import Login from './component/Login/index'
import ChatBox  from './component/Chatbox';

function App() {
  return (
    // <SocketContext.Provider value= {socket}>
      <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={(props)=> <Login  {...props}/>} />
          <Route path='/chatbox' component={(props)=> <ChatBox  {...props}/>}/>
        </Switch>
      </Router>
      </ChakraProvider>
      
     
    // </SocketContext.Provider>
   
  );
}

export default App;
