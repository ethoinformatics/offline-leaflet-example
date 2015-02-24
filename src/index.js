var $ = require('jquery');
require('./leaflet.usermarker.js');



$(function(){
	var $select = $('select');
		var southWest = L.latLng(-16.5467, 23.8898),
		    northEast = L.latLng(-12.5653, 29.4708),
		    bounds = L.latLngBounds(southWest, northEast);
	var map = L.map('map',{
		maxBounds: bounds,
	}).setView([-13.4484, 28.072], 10);

	var geoJsons = require('./geojson/');
	geoJsons.forEach(function(data){
		var $opt = $('<option></option').text(data.name);
		$opt.data('geo', data.value);
		$select.append($opt);
	});

	
	var geoJsonLayer;
	$select.on('change', function(){
		console.log('hi');
		var $selected = $select.find('option:selected');
		var geoJson = $selected.data('geo');

		if (geoJsonLayer){
			map.removeLayer(geoJsonLayer);
		}


		geoJsonLayer = L.geoJson(geoJson)
		geoJsonLayer.addTo(map);

		var bounds = geoJsonLayer.getBounds()

		console.dir(bounds);
		console.dir($selected.text());
		console.log('-------');

		// um, airstrip crashes chrome
		if ($selected.text()!= 'airstrip'){
			map.fitBounds(bounds);
		}
	});
	
	//L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
	L.tileLayer('img/MapQuest/{z}/{x}/{y}.jpg', {
		maxZoom: 14,
		minZoom: 8,
		id: 'examples.map-i875mjb7'
	}).addTo(map);



	var popup = L.popup();

	function onMapClick(coords) {
		popup
			.setLatLng(coords.latlng)
			.setContent("You clicked the map at " + Math.round(coords.latlng.lat * 10000)/10000 + ", " + Math.round(coords.latlng.lng*10000)/10000)
			.openOn(map);
	}


	map.on('click', onMapClick);

	// example current position
	var latLng = L.latLng(-15.7473, 27.2598);
	var marker = L.userMarker(latLng, {pulsing:true, accuracy:250, smallIcon:true});
	marker.addTo(map);

});
