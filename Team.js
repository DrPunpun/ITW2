$(document).ready(function () {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/teams';
        self.error = ko.observable();
        self.clubTeam = ko.observableArray([]);
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
        //--- Externel functions (accessible outside)
        teams = function () {
            var baseUri = 'http://192.168.160.28/football/api/teams'
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.clubTeam(data);
            });
        }
        teams()

        search = function () {
            searchTeam = $('#clubTeam1').val()
            baseUri = 'http://192.168.160.28/football/api/teams/search?srcStr=' + searchTeam
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.clubTeam(data);
            });
        };
        del = function () {
            $('#clubTeam1').val('');
            teams()
        }

        };
        ko.applyBindings(new vm())
    })
