# GraphQL - Rules of GraphQL Design

This repo is a demo of the implementation of GraphQL Rules of Design, as proposed by Shopify. https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md

## Purpose:

This project looks into the design aspects of GraphQL and not specifically at the implementation of resolvers to serve the data. However, once all the design rules have been implemented I will seek to implement some gql resolvers to provide a working example. To view the GQL sandbox, use `yarn dev` or `npm run dev` to spin up a local server, which should spin up on localhost:4000 (or another port as shown in the console if 4000 is not avaiable).

## Pre-requisites:

You will need [Node.JS](https://nodejs.org/en/) installed and, by personal recommendation, the [Yarn package manager](https://yarnpkg.com/), although Node.JS's own package manager, NPM, will do just fine.

To download the package, visit [github](https://github.com/StuLast/demo-graphql-gql-design) from where you can either download a zip file, or, preferrably, clone the repo: To clone, enter this into your command line:

`git clone git@github.com:StuLast/demo-graphql-gql-design.git`

Once downloaded (and unzipped if required), navigate to the folder, and install all the dependencies using one of the following, depending on your package manager.

`yarn install`

or

`npm i`

## License and code structure:

The code in this project is covered by the ISC license. Anyone can download the code from public repo. The code has been split up into branches to reflect the rules (as shown below), with the 'main' branch being the complete implementation up to the current point in time.

## Setup

A simple setup of the project. I use a nodemon.json file to configure how nodemon should behave, and, at the same time, keep the scripts in the package.json file relatively clean. This also allows me to keep global installs of npm packages to a minimum, a best practice in the Node world. Essentially, this keeps all the dependencies required by the project within the project, and stops collaborators and/or consumers of the code from having to hunt down global dependencies. Finally, it allows fine grained control of versioning of ALL dependencies and tools for the project.

## 0 - Naive Implementation

### Branch: [0_naive_implementation](https://github.com/StuLast/demo-graphql-gql-design/tree/0_naive_implementation)

The naive implementation simply creates typedefs that reflect an SQL table structure.x

## 1 - Start with a High Level View of the Objects and Their Relationships

### Branch [1_high_level_view]()
