include ../files.lst

LESS_SRC = \
	less/main.less \
	less/elements.less \
	less/layout.less \
	less/theme-1.less \
	less/theme-2.less

DST = \
	$(patsubst %.md,%.html,$(SRC)) \
	$(patsubst %.md,%.json,$(SRC)) \
	$(patsubst less/%.less,css/%.css,$(LESS_SRC))

VPATH = ../

%.html : %.md
	pandoc --template pandoc-template-html.html --section-divs $< -o ../$@

%.json : %.md
	pandoc $< --template pandoc-template-json.html --to html -o ../$@

css/%.css : less/%.less
	lessc $< ../$@

index.json: $(DST)
	cd .. && jq -s . $(patsubst %.md,%.json,$(SRC)) > index.json

touch:
	cd .. && touch $(SRC)