// Global variables
let isChoise = false,
isDeleteWindow = false,
isEditWindow = false;

// enviroment variables
let addFilter = document.querySelector(".add-filter"),
filterUsers = document.querySelector(".menu-main-filter"),
deleteUser = document.querySelector(".delete-user"),
editUser = document.querySelector(".edit-user"),
infoWindow = document.querySelector(".information-for-delete-users"),
menuList = document.querySelector(".menu-popup-header"),
menuListContent = document.querySelector(".menu-list-popup");

if (addFilter != undefined) {
    addFilter.addEventListener("click", addFilterWindow);
}

if (deleteUser != undefined) {
    deleteUser.addEventListener("click", deleteUserWindow);
}

if (editUser != undefined) {
    editUser.addEventListener("click", editUserWindow);
}

if (menuList != undefined) {
    menuList.addEventListener("click", openPopupMenu);
}

function addFilterWindow() {
    let heightContent = document.documentElement.clientHeight - 56;
    filterUsers.style['height'] = heightContent + 'px';

    if (getComputedStyle(filterUsers).display == 'none') {
        filterUsers.style['display'] = 'flex';
    } else {
        filterUsers.style['display'] = 'none';
    }
}

function deleteUserWindow() {
    if (isChoise) {
        if (getComputedStyle(infoWindow).display == 'none') {
            infoWindow.style['display'] = 'flex';
            isDeleteWindow = true;
        } else {
            infoWindow.style['display'] = 'none';
            isDeleteWindow = false;
        }
    }
}

function editUserWindow() {
    if (isChoise) {
        isEditWindow = true;
    } else {
        isEditWindow = false;
    }
}

$(function () {
    var location = window.location.href;
    var cur_url = './' + location.split('/').pop();
 
    $('.menu-list li').each(function () {
        var link = $(this).find('a').attr('href');

        if (cur_url == link) {
            $(this).addClass('text-color-blue');
        }

        if (localStorage.getItem('add-popup') == 1) {
            menuListContent.style['display'] = 'flex';
        } else {
            menuListContent.style['display'] = 'none';
        }
    });

    $('.menu-list-popup div').each(function () {
        console.log('hello');
        var link = $(this).find('a').attr('href');
        console.log(cur_url + link);

        if (cur_url == link) {
            $(this).addClass('text-color-blue');
        }
    });

});

function changeBgColor(el) {
    if (!isChoise) {
        $(el).children(".users-description-content-el").css("background", "rgba(51, 122, 183, .75)");
        isChoise = true;
    } else if (isChoise && !isDeleteWindow){
        $(el).children(".users-description-content-el").css("background", "white");
        isChoise = false;
    }

    if (isChoise && getComputedStyle(deleteUser).opacity == 0.5) {
        deleteUser.style['opacity'] = '1';
        $(deleteUser).toggleClass("delete-user-transform");
    } else {
        deleteUser.style['opacity'] = '0.5';
        $(deleteUser).toggleClass("delete-user-transform");
    }

    if (isChoise && getComputedStyle(editUser).opacity == 0.5) {
        editUser.style['opacity'] = '1';
        $(editUser).toggleClass("edit-user-transform");
    } else {
        editUser.style['opacity'] = '0.5';
        $(editUser).toggleClass("edit-user-transform");
    }

    if (isChoise){
        deleteUser.style['opacity'] = '1';
        editUser.href = './edit-users.html';
        editUser.style['opacity'] = '1';
    }
}

function openPopupMenu() {
    $(menuList).children(".add-popup").toggleClass("menu-popup-img");

    if (getComputedStyle(menuListContent).display == 'none') {
        menuListContent.style['display'] = 'flex';
        localStorage.setItem('add-popup', 1);
    } else {
        menuListContent.style['display'] = 'none';
        localStorage.setItem('add-popup', 0);
    }
}