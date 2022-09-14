
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

    let menu = JSON.parse(getCookie('menu'));
    const listSubMenu = []
    menu.forEach(item => {
        var listSub = item.list_sub_menu;
        for(let i = 0; i < listSub.length; i++){
            listSubMenu.push(listSub[i]);
        }
        if(item.link != ''){
            listSubMenu.push(item);
        }
       
    });
    let lengthRow = listSubMenu.length / 4;
    let length = listSubMenu % 4;
    if(length > 0)
        lengthRow++;
    let divCol = '';
    let divRow = '';
    for(let i = 0; i < listSubMenu.length; i++){
        divCol += `<div class="col-lg-3 col-6">
        <div class="small-box bg-info">
          <div class="inner">
            <p>${listSubMenu[i].name}</p>
          </div>
          <div class="icon">
            <i class="ion ion-bag"></i>
          </div>
          <a href="${listSubMenu[i].link}" class="small-box-footer">Xem thêm <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>`;
      if(i % 4 == 0 && i != 0){
        divRow += `<div class="row">${divCol}</div>`;
        divCol = '';
      }

    }
    $('#action-permission').html(divRow);
    console.log('menu: ', divRow);

})

