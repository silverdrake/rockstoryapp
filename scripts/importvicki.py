#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Copyright (C) 2015 Antonio Vaccarino
import csv
import json
import os
import sys

__author__ = 'Antonio Vaccarino'
__docformat__ = 'restructuredtext en'



SRC_CARDS= "rs460_vicki_DEMO.csv"


def importcards (srcdir):



	by_cardid = {}


	# reading artists file
	srcpath = os.path.join(srcdir, SRC_CARDS)
	with open (srcpath) as fp:
		reader = csv.DictReader(fp)

		for row in reader:
			cardid = row["CARDID"]

			card_talk = row["EXPLANATION"].strip()
			card_howto = row["TRICKS"].strip()
			card_links = row["HISTORY"].strip()

			if len(card_talk) == 0 and len(card_howto) == 0 and len(card_links)==0:
				continue

			item = {
				"cardid": cardid,
				"cardtype": row["DECK"],
				"cardcat": row["CAT"],
				"fields": {
					"title": row["TITLE"],
					"talk": card_talk,
					"howto": card_howto,
					"links": card_links
				}
			}
			by_cardid[cardid] = item

	vickipedia = {
		"cards": by_cardid
	}

	print "saving %s cards to file" % (len(by_cardid.keys()),)

	with open("rsvicki.json", "w+") as fp:
		json.dump(vickipedia, fp)



if __name__ == "__main__":
	srcdir = sys.argv[1]
	importcards(srcdir)