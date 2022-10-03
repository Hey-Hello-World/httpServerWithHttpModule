const http = require('http');
const server = http.createServer();

const users = [ {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },];
  
const posts = [{
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },];

const postList = [];


const httpRequestListener = function(request, response){
  const {url, method} = request;


  if(method ==='GET'){

    if(url === '/users'){
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({user: users}));
    }

    else if(url === '/posts'){
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({post: posts}));
    }

    else if(url === '/postlist'){

      for(let i=0; i<users.length; i++){

        postList.push({
          "userId"         : users[i].id,
          "userName"       : users[i].name,
          "postingId"      : posts[i].id,
          "postingTitle"   : posts[i].title,
          "postingContent" : posts[i].content,
        })
      }
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({data: postList}));
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

    else if(url === '/posts'){
        let body ='';
        request.on('data', data => body+=data);
        request.on('end', ()=>{
            const post = JSON.parse(body);

            posts.push({
                id: post.id,
                title: post.title,
                content: post.content,
                userId: post.userId,
            });
        })
        response.writeHead(201, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({message : "postCreated"}))
    }

  }
}

server.on('request', httpRequestListener);

const port = 8000;
const IP = '127.0.0.1'
server.listen(port, IP, ()=>{console.log(`Listening to request on ip ${IP} & port ${port}`)})




//