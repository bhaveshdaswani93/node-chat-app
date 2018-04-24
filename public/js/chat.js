let socket = io();
socket.on('connect',()=>{
   
    console.log('connected to server')
})

socket.on('disconnect',()=>{
    console.log('disconnected from server');
})
let obj = jQuery.deparam();
socket.emit('join_room',obj,(err)=>{
    if(err){
        alert(err);
        location.href='/';
    } else {
        console.log('no error');
    }
})
socket.on('userslist',users=>{
    console.log('user list',users)
    let ol = jQuery('<ol></ol>');
    users.forEach((user)=>{
        ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#userlist').html(ol);
})
let  autoscroll = ()=>{
    let ol = jQuery('ol');
    let newElment = ol.children('li:last');
    let previousElement = newElment.prev();

    let scrollTop = ol.prop('scrollTop');
    let scrollHeight = ol.prop('scrollHeight');
    let clientHeight = ol.prop('clientHeight');
    let newElmentInnerHeight = newElment.innerHeight()
    let previousElementInnerHeight = previousElement.innerHeight();
    console.log(scrollTop,' ::: ',clientHeight,' ::  ',scrollHeight)
    console.log(newElmentInnerHeight,' ::: ', previousElementInnerHeight)
    if(scrollTop+clientHeight+newElmentInnerHeight+previousElementInnerHeight>=scrollHeight){
        ol.scrollTop(scrollHeight)
    }
}
socket.on('newMessage',(data)=>{
    console.log('new message',data)
    let formatedDate = moment(data.createdAt).format('h:mm a')
    let template = jQuery('#message-template').html()
    let html = Mustache.render(template,{
        from:data.from,
        text:data.text,
        createdAt:formatedDate
    })
    // let li =  jQuery('<li></li>');
    // li.text(`${data.from}: ${formatedDate} ${data.text}`);
    jQuery('#messages').append(html);
    autoscroll();
});
socket.on('newLocationMessage',(data)=>{
    

    // let li = jQuery('<li></li>');
    let formatedDate = moment(data.createdAt).format('h:mm a')
    let template = jQuery('#location-message-template').html()
    let html = Mustache.render(template,{
        from:data.from,
    link:data.url,
        createdAt:formatedDate
    })
    // li.text(`Location of ${data.from}: ${formatedDate}`);
    // let a = jQuery('<a target=_blank>Location link</a>');
    // a.attr('href',data.url);
    // li.append(a);
    jQuery('#messages').append(html);
    autoscroll();
})
jQuery('form').on('submit',(e)=>{
    e.preventDefault();
    let sendButton = jQuery('[name=message]');
    let text = sendButton.val()
    socket.emit('createMessage',{
        // from:'hari',
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