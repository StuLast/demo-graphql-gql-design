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

The naive implementation simply creates typedefs that reflect an SQL table structure.

## 1 - Start with a High Level View of the Objects and Their Relationships.

### Branch [1_high_level_view](https://github.com/StuLast/demo-graphql-gql-design/tree/1_high_level_view)

The aim here is to define the relationships between the types. Only releationships are defined, but as a matter of keeping the code working, I also implement and ID field and give a title to each part of the type definition.

The point is that the detail of each type is, at a high level, pretty much irrelevant. It's the interaction between the types that is key here.

## 2 - Never Expose Implementation Details

### Branch: [2_Hide_Implementation](https://github.com/StuLast/demo-graphql-gql-design/tree/2_Hide_Implementation)

GraphQL's purpose is to provide an API tool for client software to get data. How that data is structured in the database, or how the relationships are managed are not relevant, and will serve no purpose to the client. The only data that needs to be provided, is the data the client needs to consume or the data the API wishes to furnish.

This being the case, mapping tables that provide many-to-many relationship mapping serve no purpose to the client and should not be included in the schema definition. The only places this information is useful are in the resolvers, in order to construct a data response, and in the database itself, to provide detail of relationships.

## 3 - Design API around business domain

### Branch [2-design-api-around-business-domain](https://github.com/StuLast/demo-graphql-gql-design/tree/3-design-api-around-business-domain)

Thinking about what data we are showing to the user/client, they again don't care about how the data/code is implemented, only that it is presented to them in a manner that allows them to achieve what they're trying to do.

In the case of this example, we have 2 types for groups. The user doesn't care about that , they just want to be able to use a group list to search for products within that group.

So to put this in terms of the rule, the business domain contains a facility for users to search by a group. The implementaiton of that is more complex, but is of no concern to the user. Keeping in mind that GraphQL is an API used to access data for the business purpose makes this easier to think about.

## 4. It's Easier to add fields than remove them

### Branch: [4-easier-to-add-fields-than-remove-them](https://github.com/StuLast/demo-graphql-gql-design/tree/4-easier-to-add-fields-than-remove-them)

If we remove a field from the API, we risk introducing breaking changes. In other words if a client that is consuming the API asks for a field that isn't there, an error will occur, often causing difficulties for the client's users.

On the other hand, if we add a field that the client isn't asking for yet, no harm is done, and the field can be added down the line when the client is updated.

This is why we should adopt the approach of only including what we need to include to meet the specific purpose of the API a that point in time, or to meet specific needs defined in a development plan. It's very much a case of less is more.

Remember - Breaking changes can often cause visible failures of the API and client software.

## 5. Group Closely Related Fields Together In Sub Object

### Branch: [5-group-closely-related-fields-together-in-sub-object](https://github.com/StuLast/demo-graphql-gql-design/tree/5-group-closely-related-fields-together-in-sub-object)

Sub objects add a great deal of flexibility. You can create a compound type of closely related features, in this case the feature set, and then apply nullable rules to the compound type, and separately to the types within the compound type. This add a degree of flexibility to how we build our API structure.
s
