let socket = io();
socket.on('connect',()=>{
   
    console.log('connected to server')
})

socket.on('disconnect',()=>{
    console.log('disconnected from server');
})
socket.on('newMessage',(data)=>{
    console.log('new message',data)
    let li =  jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    jQuery('ol').append(li)
});
socket.on('newLocationMessage',(data)=>{
    let li = jQuery('<li></li>');
    li.text(`Location of ${data.from}: `);
    let a = jQuery('<a target=_blank>Location link</a>');
    a.attr('href',data.url);
    li.append(a);
    jQuery('ol').append(li);
})
jQuery('form').on('submit',(e)=>{
    e.preventDefault();
    let sendButton = jQuery('[name=message]');
    let text = sendButton.val()
    socket.emit('createMessage',{
        from:'hari',
        text
    },(data)=>{
        sendButton.val('');
        console.log(data);
    })
});
let getlocation = jQuery('#send-location');
getlocation.on('click',()=>{
    if(!navigator.geolocation){
       return alert('geolocatipn not supported');
    }

    getlocation.attr('disabled','disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition((position)=>{
        getlocation.removeAttr('disabled').text('Send Location');
        console.log(position)
        socket.emit('createLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },(err)=>{
        getlocation.removeAttr('disabled').text('Send Location');
        console.log(err);
        alert('error getting your location')
    })

})