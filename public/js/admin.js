/* globals $ */
'use strict';

$(function() {

    $('#all-users').jsGrid({
        height: '700px',
        width: '100%',
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 3,
        deleteConfirm: 'Do you really want to delete a user?',
        controller: {
            loadData: function(filter) {
                return $.ajax({
                    type: 'GET',
                    url: '/admin/users',
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: 'POST',
                    url: '/admin/users',
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: 'PUT',
                    url: '/admin/users',
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: 'DELETE',
                    url: '/admin/users',
                    data: item
                });
            }
        },
        fields: [
            { name: 'username', type: 'text', title: 'Username', width: '15%', filtering: true, sorting: true },
            { name: 'email', type: 'text', title: 'E-mail', width: '15%', filtering: true, sorting: true },
            { name: 'firstname', type: 'text', title: 'First Name', width: '15%', filtering: true, sorting: true },
            { name: 'lastname', type: 'text', title: 'Last Name', width: '15%', filtering: true, sorting: true },
            { name: 'isAdmin', type: 'checkbox', title: 'Is Admin', filtering: true },
            { type: 'control' }
        ]
    });

});