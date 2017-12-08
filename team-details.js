$('document').ready(function () {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var url = location.hash;
        var listIds = url.split('/');
        var fifaId = listIds.pop();
        var id = listIds.pop();
        document.getElementById('teamImage').src = 'https://cdn.sofifa.org/18/teams/' + fifaId + '.png';
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/teams/seasons/' + id;
        self.error = ko.observable();
        self.teamInfo = ko.observableArray([]);
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        var getInfo = function () {
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.teamInfo(data);
            });
        };
        getInfo();
    }
    ko.applyBindings(new vm)
})