---
title: Testing Pandoc Markdown
author: James Heggie
date: 04/05/2021
keywords: testing abc
description: A testing page of markdown
file: test.html
---

# This is a title {.title}

This is a table:

A     B
----- -----
3.132 42
6.264 84

And this is a line after the markdown.

![The Firefox logo](notes/logo.svg)

And this is a blockquote:

> This is a blockquote split over more than one line in the source code
> although of course that isn't how it will be rendered.

~~~{.c}
#include <stdio.h>

int main() {
  return 0;
}
~~~

## Some definitions {#title2}

Statistic
: An estimate for a population parameter

Population
: The complete set of all members of interest. Note that even with unlimited sampling
  the whole population may not be represented in a sample as there may be members of
  the class who have yet to be born.

Followed by [a link][Google] and [another one](#title2)

## Some other bits and pieces

::: {#special}
This is a div[^1] which also contains [a custom span!]{#my-span style="color:blue"}
:::

## Footnotes...

[^1]: This is a footnote! Look at it go. It might contain something useful, but
      probably not.

[Google]: https://www.google.com/ "Google!
