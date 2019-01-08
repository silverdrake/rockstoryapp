#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv
import json
import os
import sys

SRC_ARTISTS = "rs460_artists.csv"
SRC_ACTIVITIES = "rs500_activities.json"
SRC_MODEVENTS = "rs500_modevents.json"

def importcards ():

	srcdir = os.path.join((os.path.dirname(os.path.realpath(__file__))),"src")

	cardsdata = {}

	# reading artists file
	srcpath = os.path.join(srcdir, SRC_ARTISTS)
	with open (srcpath) as fp:
		reader = csv.DictReader(fp)

		section = "artist"
		for row in reader:

			cardid = row["CARDID"]
			item = {
				"cardid": cardid,
				"cardtype": section,
				"cardtitle": row["NAME"],
				"fields": {
					"gender": row["GENDER"],
					"stereotype": row["STEREOTYPE"],
					"name": row["NAME"],
					"genre": row["GENRE"],
					"skill": row["SKILL"],
					"perk_plus": row["PERK+"],
					"perk_minus": row["PERK-"],
					"imageid" : row["IMAGE"]
				}
			}

			cardsdata[cardid] = item

	images = {
		"tour": "act_touring",
		"record": "act_recording"
	}

	srcpath = os.path.join(srcdir, SRC_ACTIVITIES)
	with open (srcpath) as fp:
		data = json.load(fp)
		section = "activity"
		for card in data["cards"]:
			cat = card["activity"]
			cardid = card["cardid"]
			item = {
				"cardid": cardid,
				"cardtype": section,
				"cardtitle": card["title"],
				"fields": {
					"title": card["title"],
					"cat": cat,
					"imageid": images[cat],
					"rules": card["rules"]
				}
			}
			cardsdata[cardid] = item

	srcpath = os.path.join(srcdir, SRC_MODEVENTS)
	with open (srcpath) as fp:
		data = json.load(fp)
		section = "modevent"
		for card in data["cards"]:
			cardid = card["cardid"]
			cat = card["category"]
			item = {
				"cardid": cardid,
				"cardtype": section,
				"cardtitle": card["title"],
				"fields": {
					"title": card["title"],
					"cat": cat,
					"imageid": "mev_"+cat,
					"rules": card["rules"],
					"interrupt": card.get("interrupt", False)
				}
			}
			cardsdata[cardid] = item

	print "saving %s cards to file" % (len(cardsdata.keys()),)

	with open("rscards.json", "w+") as fp:
		json.dump(cardsdata, fp)

if __name__ == "__main__":
	importcards()