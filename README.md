[![Build Status](https://travis-ci.org/gerisztein/atm-es6.svg?branch=master)](https://travis-ci.org/gerisztein/atm-es6)

# atm-es6

## TL;DR

To run locally just type:

```shell
$ npm i
$ npm run serve
```

Or access the [live demo](https://gerisztein.github.io/atm-es6).

## Description

This is an exercise that simulates an **ATM** (Cash Machine).

The rules are simple:

- It should always deliver the lowest number of bills
- It's possible to get the amount requested with available bills
- The client balance is infinite
- Amount of bills/money is infinite
- Available bills $100, $50, $20 and $10

## Examples

**Entry:** 30  
**Result:** [20, 10]

**Entry:** 80  
**Result:** [50, 20, 10]

**Entry:** 280  
**Result:** [2 * 100, 50, 20, 10]

**Entry:** 125  
**Result:** *throw NoteUnavailableException*

**Entry:** -130  
**Result:** *throw InvalidArgumentException*

**Entry:** NULL  
**Result:** *throw [EMPTY SET]*

## Installation

Clone the repository and then go to the folder

```shell
$ git clone git@github.com:gerisztein/atm-es6.git
$ cd atm-es6
```

Install all the dependencies

```shell
$ npm install
```

Serve it locally

```shell
$ npm run serve
```
Then open the browser with the URL provided in the terminal, usually it is [http://localhost:8080](http://localhost:8080).

## Live Demo

A working version of the project is also available [here](https://gerisztein.github.io/atm-es6).

## Tech Stack

- Webpack
	- [Webpack](https://webpack.js.org/) - Module Bundler
	- [Webpack-CLI](https://github.com/webpack/webpack-cli) - CLI Tools
	- [Webpack-Serve](https://github.com/webpack-contrib/webpack-serve) - Dev Server
	- Some webpack plugins
- [Vanilla Javascript](http://es6-features.org/) (ES6)
- [Husky](https://github.com/typicode/husky/) and [Commitlint](https://github.com/marionebl/commitlint) - Commit linter
- [TravisCI](https://travis-ci.org/) - Continuous Integration

## License

MIT License &copy; Lucas Gerisztein