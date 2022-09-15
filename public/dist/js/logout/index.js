
const handleLogout = document.querySelector('#HandleLogout');    
    handleLogout.addEventListener('click', function(e){
        console.log('123123')
        document.cookie = "token=;";
        window.location.href = "/";
    })

