# Public targets:
#   touch
#   install-tests
#

# Defines SRC - a list of files to transform; paths relative to project root
#
-include ../../files.lst

LESS_SRC = \
	simple-kb/less/main.less \
	simple-kb/less/elements.less \
	simple-kb/less/layout.less \
	simple-kb/less/theme-1.less \
	simple-kb/less/theme-2.less

# Note:
#   patsubs converts .md, .docx and .odt to to .html
#   this is then duplicated for .json
#
DST = \
	$(patsubst %.md,%.html,\
	  $(patsubst %.docx,%.html,\
	    $(patsubst %.odt,%.html,$(SRC))\
	  )\
	)\
	$(patsubst %.md,%.json,\
	  $(patsubst %.docx,%.json,\
	    $(patsubst %.odt,%.json,$(SRC))\
	  )\
	)\
	$(patsubst simple-kb/less/%.less,simple-kb/css/%.css,$(LESS_SRC))

DST_JSON = \
	$(patsubst %.md,%.json,\
	  $(patsubst %.docx,%.json,\
	    $(patsubst %.odt,%.json,$(SRC))\
	  )\
	)

VPATH = ../../

# Note: pandoc is always run from the project root directory - this is required for
#       docx output to ensure img paths are relative to the root and not to the
#       word doc itself.
#
#       For consistency we always run pandoc from the project root. This has some
#       implications for how the Makefile invokes pandoc:
#       (1) Prefix with "cd ../.. && "
#       (2) Paths to templates & other build files prefixed with "simple-kb/build/"
#       (3) Dependencies appear as "$(<:../../%=%)", this strips any leading ../..
#       (4) Targets appear as $(@:../../%=%) for the same reason
#

# Note: some ODT support is present in this makefile. Don't use it - I can't be
#       bothered to strip it out but it doesn't work well
#       --> Various important structural elements (i.e. title!) don't convert well
#       --> Meta data doesn't seem to copy accross - this is the dealbreaker
#           because it makes the automatic generation of the json index impossible.
#

%.html : %.md
	cd ../.. && pandoc --template simple-kb/build/pandoc-template-html.html --section-divs $(<:../../%=%) -o $(@:../../%=%)

%.html : %.docx
	cd ../.. && pandoc --extract-media=$(@D) --template simple-kb/build/pandoc-template-html.html --section-divs $(<:../../%=%) -o $(@:../../%=%)

%.html : %.odt
	cd ../.. && pandoc --extract-media=$(@D) --template simple-kb/build/pandoc-template-html.html --section-divs $(<:../../%=%) -o $(@:../../%=%)

%.json : %.md
	cd ../.. && pandoc $(<:../../%=%) --template simple-kb/build/pandoc-template-json.html --to html -o $(@:../../%=%).tmp
	./jq-add-filename.bat $(patsubst %.json,%.html,$@) ../../$@.tmp ../../$@
	rm ../../$@.tmp

%.json : %.docx
	cd ../.. && pandoc $(<:../../%=%) --template simple-kb/build/pandoc-template-json.html --to html -o $(@:../../%=%).tmp
	./jq-add-filename.bat $(patsubst %.json,%.html,$@) ../../$@.tmp ../../$@
	rm ../../$@.tmp

%.json : %.odt
	cd ../.. && pandoc $(<:../../%=%) --template simple-kb/build/pandoc-template-json.html --to html -o $(@:../../%=%).tmp
	./jq-add-filename.bat $(patsubst %.json,%.html,$@) ../../$@.tmp ../../$@
	rm ../../$@.tmp

simple-kb/css/%.css : simple-kb/less/%.less
	lessc $< ../../$@

index.json: $(DST) index.html
	cd ../.. && jq -s . $(DST_JSON) > index.json

index.html: simple-kb/build/pandoc-template-index.html index.md
	pandoc --template pandoc-template-index.html ../../index.md -o ../../index.html

touch:
	cd ../.. && touch $(SRC)

install-tests:
	cp ../tests/files.lst ../../
