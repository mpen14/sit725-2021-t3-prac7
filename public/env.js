// const testButtonFunction=()=>{
//   alert('Thank you for clicking')
// }

// // connect to the socket

// let socket = io();


// socket.on('number', (msg) => {
//     console.log('Random number: ' + msg);
// })

// console.log('test')
// $(document).ready(function(){
//   console.log('Ready')
  
//   //bind the button
//   $('#testButton').click(testButtonFunction)

//   //test get call
//   $.get('/test?user_name="Fantastic User"',(result)=>{
//     console.log(result)
//   })


// })
//Send data to server
const submitTool=(comment)=>{
  $.ajax({
      url: '/api/comments',
      contentType: 'application/json',
      data: JSON.stringify(comment),
      type: 'POST',
      success: function(result) {
          alert('Tool added successfully')
      }
  });
  
}

// On click newTool() function
const newTool=()=>{
  let name = $('#name').val()
  let description = $('#description').val()

  let comment={name,description}

  console.log(comment)
  submitTool(comment)
}

const requestComments=()=>{
  $.get('/api/comments',(comments)=>{
      if(comments.length>0){
          console.log(comments)
          listComments(comments)
      }
  })
}

//connect to socket
let socket = io();

socket.on('number',(msg) => {
    console.log('Random number: '+msg);
    $('#socketOut').html(msg)
})

listComments=(comments)=>{
  comments.forEach(comment => {
      console.log(comment)
      let item ='<div class="card">'+
      '<div class="card-content">'+
      '<span class="card-title activator grey-text text-darken-4">'+comment.name+'</span>'+
      '</div>'+
      '<div class="card-reveal">'+
      '<p>'+comment.description+'</p>'+
   '</div>'+
   '</div>'          
  
  $('#listComments').append(item)
  });
}

// INITIALIZATION 
const dummyComment={
  name:'Protractor',
  description:'New tool to learn'
}

let dummyData=[dummyComment,dummyComment]

$(document).ready(function(){
  console.log('Ready')

  // get data and build the ui component
  listComments(dummyData)

  //bind the button
  //$('#testButton').click(testButtonFunction)

  requestComments()

})


