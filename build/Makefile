-include ../files.lst

LESS_SRC = \
	www/less/main.less \
	www/less/elements.less \
	www/less/layout.less \
	www/less/theme-1.less \
	www/less/theme-2.less

DST = \
	$(patsubst %.md,%.html,$(SRC)) \
	$(patsubst %.md,%.json,$(SRC)) \
	$(patsubst www/less/%.less,www/css/%.css,$(LESS_SRC))

VPATH = ../

%.html : %.md
	pandoc --template pandoc-template-html.html --section-divs $< -o ../$@

%.json : %.md
	pandoc $< --template pandoc-template-json.html --to html -o ../$@.tmp
	./jq-add-filename.bat $(patsubst %.json,%.html,$@) ../$@.tmp ../$@
	rm ../$@.tmp

www/css/%.css : www/less/%.less
	lessc $< ../$@

index.json: $(DST)
	cd .. && jq -s . $(patsubst %.md,%.json,$(SRC)) > index.json

touch:
	cd .. && touch $(SRC)

install-tests:
	cp ../www/tests/files.lst ../