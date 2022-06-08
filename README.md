[![Pylint](https://github.com/rafalsiniewicz/scrabble_solver/actions/workflows/pylint.yml/badge.svg)](https://github.com/rafalsiniewicz/scrabble_solver/actions/workflows/pylint.yml)
[![UnitTests](https://github.com/rafalsiniewicz/scrabble_solver/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/rafalsiniewicz/scrabble_solver/actions/workflows/unit_tests.yml)
![coverage](https://user-images.githubusercontent.com/36672426/151042288-ef4f3f34-58e6-43ae-ad63-e19dcf8d16bc.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f0586e7d-d9a6-41f7-bbe9-b1620880761f/deploy-status)](https://app.netlify.com/sites/scrabble-solver/deploys)

# Scrabble solver

## Table of contents
- [About the project](#about-the-project)
- [Technologies used](#technologies-used)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Docker](#docker)
- [Roadmap](#roadmap)
- [Documenation](#documentation)
- [References](#references)

# About the project
Scrabble solver is the website application that allows to find the best words for the scrabble game basing on provided letters.

# Technologies used

## Backend
- REST API created in python3.6/django
- API contains info about existing words and their points
- deployed on heroku: [https://scrabble-solver-app.herokuapp.com/](https://scrabble-solver-app.herokuapp.com/)


## Frontend
- created in html/js/css
- website: [scrabble-solver](https://scrabble-solver.netlify.app/)

# Getting started
## Installation
**1. Clone the repo:**
```bash
git clone https://github.com/rafalsiniewicz/scrabble_solver.git
```
**2. Install dependencies:**
```bash
python3 -m pip install -r requirements.txt
```


## Docker
1. Run docker
```bash
docker compose up
```
2. 

# Roadmap
- [x] - Create backend functionality
- [x] - Create frontend
- [ ] - Create tests
- [ ] - Add sign up/sign in options
- [ ] - Create documentation
- [ ] - 

# Documentation
- [docs](https://scrabble-solver.netlify.app/documentation/site/index.html)

# References
1. https://scrabblemania.pl/
2. http://www.pfs.org.pl/osps.php
