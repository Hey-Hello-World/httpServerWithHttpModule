const http = require('http');
const server = http.createServer();

const users = [];
const posts = [];

const httpRequestListener = function(request, response){
  const {url, method} = request;

  if(method ==='GET'){
    if(url === '/users'){
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({user: users}));
    }
  }
  else if(method === 'POST'){
    if(url === '/users'){

      let body = '';

      request.on('data', data => body+=data);
      request.on('end', ()=>{

        const user = JSON.parse(body);

        users.push({
          name: user.name,
          id: user.id,
          email: user.email,
          password: user.password,
        })
      })

      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({message : "userCreated"}));

    }
  }
}

server.on('request', httpRequestListener);

const port = 8000;
const IP = '127.0.0.1'
server.listen(port, IP, ()=>{console.log(`Listening to request on ip ${IP} & port ${port}`)})