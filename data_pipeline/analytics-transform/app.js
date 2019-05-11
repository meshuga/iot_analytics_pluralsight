const reverse = require('reverse-geocode');

exports.handler = function (events, context, callback) {
    for (var key in events) {
        if ('location_lat' in events[key] && 'location_lol' in events[key]) {
            let lat = events[key]['location_lat'];
            let lon = events[key]['location_lon'];
            let lookup = reverse.lookup(lat, lon, 'US');
            events[key]['location_details_city'] = lookup['city'];
            events[key]['location_details_state'] = lookup['state'];
        } else {
            events[key]['location_details_city'] = null;
            events[key]['location_details_state'] = null;
        }
    }
    callback(null, events);
};