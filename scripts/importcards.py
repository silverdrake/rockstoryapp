#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Copyright (C) 2015 Antonio Vaccarino
import csv
import json
import os
import sys

__author__ = 'Antonio Vaccarino'
__docformat__ = 'restructuredtext en'



SRC_ARTISTS = "rs460_artists.csv"
SRC_ACTIVITIES = "rs463_activities.csv"
SRC_MODEVENTS = "rs463_modevents.csv"


def importcards (srcdir):



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

	# reading activities file
	srcpath = os.path.join(srcdir, SRC_ACTIVITIES)
	with open (srcpath) as fp:
		reader = csv.DictReader(fp)
		section = "activity"
		for row in reader:

			cardid = row["CARDID"]
			item = {
				"cardid": cardid,
				"cardtype": section,
				"cardtitle": row["TITLE"],
				"fields": {
					"title": row["TITLE"],
					"cat": row["ACTIVITY"],
					"imageid": row["STORY_IMAGE"],
					"rule_base": row["SHORT"],
					"rule_custom": row["SPECIAL"]
				}
			}
			cardsdata[cardid] = item

	# reading modevents file
	srcpath = os.path.join(srcdir, SRC_MODEVENTS)
	with open(srcpath) as fp:
		reader = csv.DictReader(fp)
		section = "modevent"
		for row in reader:
			cardid = row["CARDID"]

			rule_normal = row["DESCRIPTION"]
			if len(rule_normal.strip()) == 0:
				rule_normal = None
			rule_interrupt = row["INTERRUPT"]
			if len(rule_interrupt.strip()) == 0:
				rule_interrupt = None

			item = {
				"cardid": cardid,
				"cardtype": section,
				"cardtitle": row["TITLE"],
				"fields": {
					"title": row["TITLE"],
					"cat": row["CATEGORY"],
					"imageid": row["STORY IMAGE"],
					"rule": rule_normal,
					"interrupt": rule_interrupt
				}
			}
			cardsdata[cardid] = item


	print "saving %s cards to file" % (len(cardsdata.keys()),)

	with open("rscards.json", "w+") as fp:
		json.dump(cardsdata, fp)



if __name__ == "__main__":
	srcdir = sys.argv[1]
	importcards(srcdir)