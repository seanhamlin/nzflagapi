#!/usr/bin/env python
import json

# Ths source URL to replace, this makes the file smaller
base_img_src = 'https://www.govt.nz/assets/flags-designs'

# input files
input_file = 'flags.json'
alt_tags_seperator = 'tagged with:'

# output files
output_file = 'flags.json'
output_file_min = 'flags.min.json'

# How many spaces to indent the formatted json file
output_file_indent = 2

print "Reading json from input file {input}".format(input=input_file)
f = open(input_file, 'r')
j = json.load(f)
f.close()

updated_objects = 0
output = []

for flag in j:
	if 'alt' not in flag:
		continue

	if alt_tags_seperator in flag['alt']:
		flag['tags'] = flag['alt'][:-1].split(alt_tags_seperator)[1][1:].replace(', ', ',').split(',')
	else:
		flag['tags'] = []

	del flag['alt']
	flag['src'] = flag['src'].replace(base_img_src, '')
	
	updated_objects = updated_objects + 1
	output.append(flag)


if updated_objects > 0:
	print "Updated {objects} objects".format(objects=updated_objects)

	print "Writing minified file"
	f1 = open(output_file, 'w')
	json.dump(output, f1)
	f1.close()

	print "Writing pretty file"
	f2 = open(output_file_min, 'w')
	json.dump(output, f2, indent=output_file_indent)
	f2.close()

else:
	print "No objects need updating"
