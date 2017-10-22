/**
 * Copyright (C) 2015 Antonio Vaccarino
 * Created with PyCharm.
 * Date: 10/22/17
 * Time: 4:26 PM
 */

const RENDERERS = {
	"artist": renderArtistCard,
	"activity": renderActivityCard,
	"modevent": renderModeventCard
};

const TEMPLATES = {
	"artist": "file_card_artist",
	"activity": "file_card_actvitiy",
	"modevent": "file_card_modevent"
};


function renderArtistCard (data)
{
	var template = $("#"+TEMPLATES["artist"]).html();
	var params = data["fields"];

	var rendered = $(Mustache.render(template, params));
	return rendered;
}

function renderActivityCard (data)
{
	var template = $("#"+TEMPLATES["activity"]).html();
}

function renderModeventCard (data)
{
	var template = $("#"+TEMPLATES["modevent"]).html();


}

function renderCard (data)
{
	console.log("renderind ",data);
	var render = RENDERERS[data["cardtype"]](data);
	// console.log(render);
	var TARGET = $("#content_main");
	TARGET.empty().append(render);
}