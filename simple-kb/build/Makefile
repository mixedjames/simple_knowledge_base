-include ../../files.lst

LESS_SRC = \
	simple-kb/less/main.less \
	simple-kb/less/elements.less \
	simple-kb/less/layout.less \
	simple-kb/less/theme-1.less \
	simple-kb/less/theme-2.less

DST = \
	$(patsubst %.md,%.html,$(SRC)) \
	$(patsubst %.md,%.json,$(SRC)) \
	$(patsubst simple-kb/less/%.less,simple-kb/css/%.css,$(LESS_SRC))

VPATH = ../../

%.html : %.md
	pandoc --template pandoc-template-html.html --section-divs $< -o ../../$@

%.json : %.md
	pandoc $< --template pandoc-template-json.html --to html -o ../../$@.tmp
	./jq-add-filename.bat $(patsubst %.json,%.html,$@) ../../$@.tmp ../../$@
	rm ../../$@.tmp

simple-kb/css/%.css : simple-kb/less/%.less
	lessc $< ../../$@

index.json: $(DST)
	cd ../.. && jq -s . $(patsubst %.md,%.json,$(SRC)) > index.json

touch:
	cd ../.. && touch $(SRC)

install-tests:
	cp ../tests/files.lst ../../

install:
	cp ../index.html ../../