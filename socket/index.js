const io = require("socket.io")(8000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  let notificationUsers=[]
   
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });

 


  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      // console.log("reached inside send merssage ***************** ", data);
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    });


    socket.on("send-notification", (data) => {
       console.log("reached inside send merssage ***************** ", data);
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId,user)
   
      if (user) {
        io.to(user.socketId).emit("receive-notification", data);
      }
    });
  })






// const io = require("socket.io")(8000, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });
//   let activeUsers =[]

//   io.on("connection",(socket)=>{
// // add new user 
// socket.on('new-user-add',(newUserId)=>{
//    // if user is not added previously
//       if (!activeUsers.some((user) => user.userId === newUserId)) {
//         activeUsers.push({ userId: newUserId, socketId: socket.id });
//         console.log("New User Connected", activeUsers);
//       }
//       console.log(activeUsers,"Connected-Users" );
//       io.emit('get-users',activeUsers)
// })


// //sendMessage
// socket.on('send-message',(data)=>{
//   console.log('Data at socket .io sened messaage ',data,activeUsers,"activeUsers")
//   const receiverId=data;
//   const user =activeUsers.find((user)=>user.userId===receiverId)
//   console.log("sending from socket to : ",receiverId)
//   console.log('Data',data)
//   if(user){
//     io.to(user.socketId).emit("receive-message",data)
//   }
// })

// socket.on('disconnect',()=>{
//   activeUsers=activeUsers.filter((user)=>user.socketId !==socket.id)
// console.log("user Disconnected ",activeUsers);
// io.emit('get-users',activeUsers)
// })
//   })