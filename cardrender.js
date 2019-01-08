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
	"activity": "file_card_activity",
	"modevent": "file_card_modevent"
};

const MARKERS = {
	"STRUGGLE": "res/rockstory/symbols/marker_tension.png",
	"CRED": "res/rockstory/symbols/marker_cred.png",
	"FAME":  "res/rockstory/symbols/marker_fame.png",
	"MONEY":  "res/rockstory/symbols/marker_money.png",
	"REPERTOIRE":  "res/rockstory/symbols/marker_hits.png"
};

const CHARS = {
	"AUTEUR": "res/rockstory/symbols/icon_char_auteur.png",
	"CLOWN": "res/rockstory/symbols/icon_char_clown.png",
	"HEARTTHROB": "res/rockstory/symbols/icon_char_heartthrob.png",
	"LOUDMOUTH": "res/rockstory/symbols/icon_char_loudmouth.png",
	"MOGUL": "res/rockstory/symbols/icon_char_mogul.png",
	"SENTIMENTAL": "res/rockstory/symbols/icon_char_sentimental.png",
	"VAGABOND": "res/rockstory/symbols/icon_char_vagabond.png",
	"VIRTUOSO": "res/rockstory/symbols/icon_char_virtuoso.png",
};


const DUALS = {
	"CHARISMA": "res/rockstory/symbols/dual_charisma.png",
	"CREATIVITY": "res/rockstory/symbols/dual_creativity.png",
	"LOYALTY": "res/rockstory/symbols/dual_loyalty.png",
	"MONEY": "res/rockstory/symbols/dual_money.png",
	"PEACE": "res/rockstory/symbols/dual_peace.png",
	"SAFETY": "res/rockstory/symbols/dual_safety.png",
};


const GENRES = {
	"HEAVY METAL": "Heavy Metal",
	"HARD ROCK": "Hard Rock",
	"PROGRESSIVE": "Progressive Rock",
	"EXTREME": "Extreme Metal",
	"GLAM": "Glam Rock"
};

const ICONS = {
	"ROLL": "res/ui/dice/icon_dieroll_dual.png",
	"ROLL_TROUBLE": "res/rockstory/symbols/dual_safety.png",
};

function replaceCardSymbols (srcstring)
{
	if (srcstring != null)
	{
		var changed = ""+srcstring;
		var matcher, replacement;

		// remove linebreaks FIRST otherwise we break image tags
		matcher = ".";
		while (changed.indexOf(matcher)!=-1)
		{
			replacement = "<br>";
			changed = changed.replace(matcher, replacement);
		}
		
		// markers icons
		for (var markerid in MARKERS)
		{
			matcher = "{{"+markerid+"}}";
			while (changed.indexOf(matcher)!=-1)
			{
				replacement = "<img class=\"ruleglyph\" src=\""+MARKERS[markerid]+"\">";
				changed = changed.replace(matcher, replacement);
			}
		}

		// stereotype icons
		for (var charid in CHARS)
		{
			matcher = "{{"+charid+"}}";
			while (changed.indexOf(matcher)!=-1)
			{
				replacement = "<img class=\"ruleglyph\" src=\""+CHARS[charid]+"\">";
				changed = changed.replace(matcher, replacement);
			}
		}
		
		// stereotype icons
		for (var iconid in ICONS)
		{
			matcher = "{{"+iconid+"}}";
			while (changed.indexOf(matcher)!=-1)
			{
				replacement = "<img class=\"ruleglyph\" src=\""+ICONS[iconid]+"\">";
				changed = changed.replace(matcher, replacement);
			}
		}

		matcher = "]][[";
		while (changed.indexOf(matcher)!=-1)
		{
			replacement = "]]&nbsp;[[";
			changed = changed.replace(matcher, replacement);
		}

		// duals icons
		for (var dualid in DUALS)
		{
			matcher = "[["+dualid+"|POS]]";
			while (changed.indexOf(matcher)!=-1)
			{
				replacement = "<div class='iconholder dual_positive'><img class=\"ruleglyph_dual\" src=\""+DUALS[dualid]+"\"></div>";
				changed = changed.replace(matcher, replacement);
			}

			matcher = "[["+dualid+"|NEG]]";
			while (changed.indexOf(matcher)!=-1)
			{
				replacement = "<div class='iconholder dual_negative'><img class=\"ruleglyph_dual\" src=\""+DUALS[dualid]+"\"></div>";
				changed = changed.replace(matcher, replacement);
			}
		}


		matcher = "[[POS]]";
		while (changed.indexOf(matcher)!=-1)
		{
			replacement = "<div class='iconholder dual_positive'><img class=\"ruleglyph_dual\"></div>";
			changed = changed.replace(matcher, replacement);
		}

		matcher = "[[NEG]]";
		while (changed.indexOf(matcher)!=-1)
		{
			replacement = "<div class='iconholder dual_negative'><img class=\"ruleglyph_dual\"></div>";
			changed = changed.replace(matcher, replacement);
		}

		matcher = "{{INTERRUPT}}";
		while (changed.indexOf(matcher)!=-1)
		{
			replacement = "<img class=\"icon_rulemark\" src=\"res/rockstory/icons/icon_interrupt.png\">";
			changed = changed.replace(matcher, replacement);
		}
		
		
		var spaceregex = /\>\>\d*\<\</gi;
		changed = changed.replace(spaceregex, function  (matched) {
			return "";
		});


		return changed;
	}
	else
	{
		return srcstring;
	}
}


function renderArtistCard (data)
{
	var template = $("#"+TEMPLATES["artist"]).html();
	var params = data["fields"];

	try
	{
		params["_GENRE"] = GENRES[params["genre"]].toUpperCase();
	}
	catch (err)
	{
		params["_GENRE"] = params["genre"].toUpperCase();
	}

	params["_PERSONA"] = params["stereotype"].toUpperCase();

	var rendered = $(Mustache.render(template, params));
	return rendered;
}

function renderActivityCard (data)
{
	var template = $("#"+TEMPLATES["activity"]).html();
	var params = data["fields"];
	var rules = params["rules"];
	for (var i = 0; i <  rules.length; i++)
	{
		params["rules"][i] = replaceCardSymbols(rules[i]);
	}
	

	var rendered = $(Mustache.render(template, params));
	return rendered;
}

function renderModeventCard (data)
{
	var template = $("#"+TEMPLATES["modevent"]).html();
	var params = data["fields"];
	var rules = params["rules"];
	for (var i = 0; i <  rules.length; i++)
	{
		params["rules"][i] = replaceCardSymbols(rules[i]);
	}
	
	if (params["interrupt"])
	{
		replaceCardSymbols(params["interrupt"]);
	}


	var rendered = $(Mustache.render(template, params));
	return rendered;


}

function renderCard (data)
{
	console.log("rendering ",data);
	var render = RENDERERS[data["cardtype"]](data);
	// console.log(render);
	var TARGET = $("#content_main");
	TARGET.empty().append(render);
}