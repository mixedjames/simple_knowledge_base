
## Directory Structure

~~~
.
  /build - Makefiles & other build-related files
  /notes - User content (i.e. the knowledge-base itself)
  /www   - HTML, CSS, JS etc. that is required to render the content
           (Don't fiddle with this if you're a user - any content here is owned
           by simple-knowledge-base, not by the client site)
~~~

Note: three files are mandated here but otherwise clients can do what
      they like here. The three files are:
(1) index.html
(2) files.lst
(3) index.json (created by the build process)


### Reminder to self: simple Git operations

~~~
git add --all
git commit -m "A description"
git push -u origin main
~~~