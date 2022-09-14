function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    return null;
}


$( document ).ready(async function() {
    let htmlMenu = `<li class="nav-item">
            <a href="/home" class="nav-link">
            <i class="fa fa-home"></i>
            <p>
                Trang chủ
            </p>
            </a>
        </li>`;
    
    let menu = JSON.parse(getCookie('menu'));
    menu.forEach(element => {
        const listSubMenu = element.list_sub_menu;
        let ulSubMenu = '';
        listSubMenu.forEach(item => {
            ulSubMenu += `<li class="nav-item">
                    <a href="${item.link}" class="nav-link">
                    <i class="fa fa-circle nav-icon" style="font-size: 10px;"></i>
                    <p>${item.name}</p>
                    </a>
                </li>`;
        });
        htmlMenu += `<li class="nav-item">
        <a href="${element.link}" class="nav-link">
            <i class="${element.icon}"></i>
            <p>
           ${element.name}
            <i class="right fas fa-angle-left"></i>
          </p>
        </a>
        `+(element.link == '' ? `<ul class="nav nav-treeview">${ulSubMenu}</ul>` : `K`)+`
        </li>`
    });
    $('ul#get-menu').html(htmlMenu);
    console.log('menu: ', menu);
    console.log('url: ', document.URL);
})