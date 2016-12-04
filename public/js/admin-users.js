'use strict';

$(function() {
    $('#all-users').jsGrid({
        width: '100%',
        filtering: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 3,
        pageButtonCount: 3,
        controller: {
            loadData: function(filter) {
                return requester.getJSON('/admin/users', { data: filter });
            },
            updateItem: function(item) {
                return requester.putJSON('/admin/users', item);
            },
        },
        fields: [
            { name: 'userId', type: 'text', visible: false },
            { name: 'username', type: 'text', title: 'Username', width: '15%', filtering: true, sorting: true, readOnly: true },
            { name: 'email', type: 'text', title: 'E-mail', width: '15%', filtering: true, sorting: true },
            { name: 'firstname', type: 'text', title: 'First Name', width: '15%', filtering: true, sorting: true },
            { name: 'lastname', type: 'text', title: 'Last Name', width: '15%', filtering: true, sorting: true },
            { name: 'isAdmin', type: 'checkbox', title: 'Is Admin', filtering: true },
            { name: 'isBlocked', type: 'checkbox', title: 'Is Blocked', filtering: true },
            { type: 'control', deleteButton: false }
        ]
    });
});