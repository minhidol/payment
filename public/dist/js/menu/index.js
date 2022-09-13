$(document).ready(function(){
    
    const listMenuApi = [
        {
            name: 'Quản lý nhân viên',
            link: '',
            icon: 'fa fa-users',
            list_sub_menu: [
                {
                    name: 'Quản lý tài khoản',
                    link: '/user'
                },
                {
                    name: 'Quản lý phân quyền',
                    link: '/permission'
                }
            ]
        },
        {
            name: 'Quản lý thu chi',
            link: '',
            icon: 'fas fa-money-check-alt',
            list_sub_menu: [
                {
                    name: 'Quản lý thu',
                    link: '/revenue'
                },
                {
                    name: 'Quản lý chi',
                    link: '/expense'
                }
            ]
        },
        {
            name: 'Vay lãi',
            link: '/interest-loans',
            icon: 'fas fa-money-check-alt',
            list_sub_menu: []
        }
    ]
    let menuHtml = '';
    let url = document.URL.split('/');
    let urlMenu = url[url.length - 1];
    console.log('url: ', url)
    menuHtml += `<li class="nav-item">
            <a href="/home" class="nav-link">
            <i class="fa fa-home"></i>
            <p>
                Trang chủ
            </p>
            </a>
        </li>`;
    console.log('aaa: ' ,listMenuApi.length)
    listMenuApi.forEach(item => {
        let check = 0;
        let subMenuHtml = '';
        const listSubMenu = item.list_sub_menu;
        for(let i = 0; i < listSubMenu.length; i++){
            if(listSubMenu[i].link.includes(urlMenu)){
                subMenuHtml += `<li class="nav-item">
                    <a href="${listSubMenu[i].link}" class="nav-link active">
                    <i class="fa fa-circle nav-icon" style="font-size: 10px;"></i>
                    <p>${listSubMenu[i].name}</p>
                    </a>
                </li>`;
                check = 1;
            }else{
                subMenuHtml += `<li class="nav-item">
                    <a href="${listSubMenu[i].link}" class="nav-link">
                    <i class="fa fa-circle nav-icon" style="font-size: 10px;"></i>
                    <p>${listSubMenu[i].name}</p>
                    </a>
                </li>`
            }
        }
        menuHtml += ` <li ` + ((check == 1 || item.link.includes(urlMenu)) ? `class="nav-item menu-open"` : `class="nav-item"`) + `>
            <a href="${item.link}" class="nav-link">
            <i class="${item.icon}"></i>
            <p>
                ${item.name}
                <i class="right fas fa-angle-left"></i>
            </p>
            </a>`+
           (item.link == '' ? `<ul class="nav nav-treeview">${subMenuHtml}</ul>` : '') +`
        </li>`;
    });
  $('ul#ul-menu').html(menuHtml);
});