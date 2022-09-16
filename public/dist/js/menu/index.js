// function getCookie(name) {
//     var cookieArr = document.cookie.split(";");
    
//     for(var i = 0; i < cookieArr.length; i++) {
//         var cookiePair = cookieArr[i].split("=");
//         if(name == cookiePair[0].trim()) {
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
    
//     return null;
// }


// $( document ).ready(async function() {
//     let htmlMenu = `<li class="nav-item">
//             <a href="/home" class="nav-link">
//             <i class="fa fa-home"></i>
//             <p>
//                 Trang chủ
//             </p>
//             </a>
//         </li>`;
    
//     let menu = JSON.parse(getCookie('menu'));
//     let url = document.URL.split('/');
//     let urlMenu = url[url.length - 1];
//     menu.forEach(item => {
//         const listSubMenu = item.list_sub_menu;
//         let subMenuHtml = '';
//         let check = 0;
//         for(let i = 0; i < listSubMenu.length; i++){
//             if(listSubMenu[i].link.includes(urlMenu)){
//                 subMenuHtml += `<li class="nav-item">
//                     <a href="${listSubMenu[i].link}" class="nav-link active">
//                     <i class="fa fa-circle nav-icon" style="font-size: 10px;"></i>
//                     <p>${listSubMenu[i].name}</p>
//                     </a>
//                 </li>`;
//                 check = 1;
//             }else{
//                 subMenuHtml += `<li class="nav-item">
//                     <a href="${listSubMenu[i].link}" class="nav-link">
//                     <i class="fa fa-circle nav-icon" style="font-size: 10px;"></i>
//                     <p>${listSubMenu[i].name}</p>
//                     </a>
//                 </li>`
//             }
//         }

//         htmlMenu += ` <li ` + ((check == 1 || item.link.includes(urlMenu)) ? `class="nav-item menu-open"` : `class="nav-item"`) + `>
//         <a href="${item.link}" class="nav-link">
//         <i class="${item.icon}"></i>
//         <p>
//             ${item.name}
//             <i class="right fas fa-angle-left"></i>
//         </p>
//         </a>`+
//        (item.link == '' ? `<ul class="nav nav-treeview">${subMenuHtml}</ul>` : '') +`
//         </li>`;
//     });
//     $('ul#get-menu').html(htmlMenu);
//     console.log('menu: ', menu);
//     console.log('url: ', document.URL);
// })

