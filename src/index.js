var $ = require('jquery');


$(function(){
	var $select = $('select');
	var map = L.map('map').setView([-15.4484, 26.142], 5);

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
	
	L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
	maxZoom: 18,
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
});
