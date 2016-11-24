/* globals $ */
'use strict';

let requester = (function () {
    function get(url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url,
                method: 'GET',
                success: function (result) {
                    resolve(result);
                }
            });
        });
    }

    function getJSON(url, options) {
        return new Promise(function (resolve, reject) {
            var headers = options.headers || {};
            $.ajax({
                url,
                method: 'GET',
                headers: headers,
                contentType: 'application/json',
                success(response) {
                    resolve(response);
                }
            });
        });
    }

    function putJSON(url, body, options = {}) {
        return new Promise(function (resolve, reject) {
            var headers = options.headers || {};
            $.ajax({
                url,
                headers,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }

    function postJSON(url, body, options = {}) {
        return new Promise(function (resolve, reject) {
            var headers = options.headers || {};

            $.ajax({
                url,
                headers,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }

    return {
        get,
        getJSON,
        putJSON,
        postJSON
    };

}());
