
//INSTAGRAM ACCESS TOKEN
var accessToken = '67aad4d3a43f4faf8379fb750914d8d5',
    latlng = {};

//INSTAGRAM API TAG FUNCTION
function instaTag(tag) {
    $.ajax({
            url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
            dataType: 'jsonp',
            cache: false,
            type: 'GET',
            data: {
            client_id: accessToken,
            q: tag
            },

success: function (data) {
        console.log(data);
        for (x in data.data) {
        $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>')
        }
        $('ul').append('<button type="text" id="clearInput">Clear Search Results</button>');
        },
        error: function (data) {
        console.log(data);
            }
        });
      }
      
//INSTAGRAM API LOCATION FUNCTION
function instaLocation(lat, lng) {
            $.ajax({
            url: 'https://api.instagram.com/v1/media/search?client_id="67aad4d3a43f4faf8379fb750914d8d5',
            dataType: 'jsonp',
            type: 'GET',
            cache: false,
            data: {
            client_id: accessToken,
            lat: lng,
            lng: lat,
            distance: '',
            },

success: function (data) {
            console.log(data);
            $('ul').empty();
            for (x in data.data) {
            $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>').fadeIn("#clearInput", 2000);
            }
            $('ul').append('<button type="text" id="clearInput">Clear Search Results</button>');
            },
error: function (data) {
        console.log(data);
        }
     });
    }

//Google Maps Function
function initialize() {
                var mapOptions = {
                    center: {
                    lat: -34.397,
                    lng: 150.644
                    },
                zoom: 8
                };
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                geocoder = new google.maps.Geocoder;
}

//Keydown function to pass inputs into API
$(document).ready(function () {
        initialize();
            $('#masterInput').keydown(function (e) {
                if (e.which == '13') {
                $('#search').click();
                }
            });

$("#search").click(function () {
if ($('#selector').val() === "location") {

//Google Lat/Lng function
            geocoder.geocode({
                    address: $('#masterInput').val()
                    }, function (results, status) {
                        latlng.lat = results[0].geometry.location.B;
                        latlng.lng = results[0].geometry.location.k;

//Popular Photos Search
            instaLocation(latlng.lat, latlng.lng);
            });
            } else {

//Tag Popular Search
        instaTag($('#masterInput').val());
         }
        });
//clearing of DOM and ability to reload search
    $("#search").click(function () {
            $("#clearInput").fadeIn(2000)
            })
            $("ul").on('click', '#clearInput', function () {
            $("ul li, ul #clearInput").fadeOut(2000);
         });
        });


