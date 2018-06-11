# Project Overview

In this project, an HTML+JS feed reader is completed with some necessary test suite using [Jasmine](http://jasmine.github.io/), with main focus on:
* Items in the feed list being valid
* Menu acting and responding correctly
* Page content changing according to feed navigation


# What changes were made?

The only file edited was `jasmine/spec/feedreader.js`, adding test suites and tests according to the [Project Rubric](https://review.udacity.com/#!/rubrics/18/view).

As an extra, an additional test was added in the `RSS Feeds` test suite to make sure that illegal access to the `allFeeds` array would `throw` an `exception`.

All edits are properly commented. No additional credits for the code were necessary on this one.



# How to load this project?

You can simply preview the project by downloading the sources or forking and cloning it, and running the `index.html` file in your browser.
At the end of the page, the Jasmine script will run and show the status of all test suites and tests.