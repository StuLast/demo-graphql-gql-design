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

## 6. Always check if a list should be paginated

### Branch: [6-check-if-list-should-be-paginated](https://github.com/StuLast/demo-graphql-gql-design/tree/6-check-if-list-should-be-paginated)

When dealing with even moderately long lists of returned data, it is unlikely that the user viewing individual items, will be viewing more than a small selection of those at a time. To view more of the list the user would normal scroll, click on a "next button" or something similar.

We can implement this on the GraphQL side by adding a couple of arguments in to the type definition - skip and take, for example. The first time the user visits the list, skip will be set to 0 and take to 10 (again, for example). As the user moves through the page, using whatever UI navigation methods are provided, we can update the content with skip = 10 and take = 10. Skip merely sets the starting point, and take the number of items to be rendered/viewed at a particular moment in time.

Thinking about this from a GraphQL intent point of view, pagination delivers only what the client/user wants to consume at a particular point in time. No over-fetching or under-fetching, just exactly the right data required to present what has been requested.

## 7. Always use Object references instead of ID fields

### Branch: [7-use-object-references-instead-of-id-fields](https://github.com/StuLast/demo-graphql-gql-design/tree/7-use-object-references-instead-of-id-fields)

Foreign keys usually serve no purpose to the client. A data object should only present the data that the client/user want to consume. In the case of foriegn table data, it is best to define that as a separate object, then embed that object in the type you're returning.

In the case of this project. The Group type does not care about the images ID. It serves no purpose. The image itself is what the Group type is after so by providing a compound objet instead of an ID, we can avoid additional requests to the database, and just pull off the data that has been requested, the actual url to the image.

## 8. Choose field names that make sense

### Branch: [8-choose-field-names-that-make-sense](https://github.com/StuLast/demo-graphql-gql-design/tree/8-choose-field-names-that-make-sense)

Remember that the GraphQL API we're developing is in place to provide data for a client to consume. Naming needs to make sense to the client, and does not necessarily need to reflect what we're calling things in the database, or the implementation of data fetching/resolvers. This is another form of data hiding in a similar vein to building a code interface. Use names that make sense for the consumption of the API, not necessarily for the implementation of it. Always keep the client in mind when using names that will be made visible to the client.

## 9.Use Enums for fields that can only take certain values

### Branch: [9-use-enums](https://github.com/StuLast/demo-graphql-gql-design/tree/9-use-enums)

As with all programming, enums are a useful way to ensure only the correct spelling/casing of limited options is used. Enums are very useful for highlighting coding errors.

## 10.API should provide business logic

### Branch: [10-api-should-provide-business-logic](https://github.com/StuLast/demo-graphql-gql-design/tree/10-api-should-provide-business-logic)

The API should be the central source of data AND business logic. The client's role is to present the data. The API's role is to provide data in the format required based on the request and any related arguments. In the case of this particular project, adding a field to the group to return whether the group contains a certain car or not centralises the business logic in the API, rather than have the client have to implement it numerous times.

## 11.API should provide business logic

### Branch: [11-separate-mutations-for-separate-logical-actions](https://github.com/StuLast/demo-graphql-gql-design/tree/11-separate-mutations-for-separate-logical-actions)

Think about how the client will be interacting with the UI, updating a resource is a separate logical step from publishing a group or adding/removing cars from a group. So, in order to keep the API obvious to use, we split up mutations into separate logical actions on a resource. Once again, the API is providing an interface for the client to use, not presenting them with business logic to figure out.

## 12. For Relationship Mutations Consider Operating on Multiple Elements

### Branch: [12-relationship-operations-operate-on-multiple-elements](https://github.com/StuLast/demo-graphql-gql-design/tree/12-relationship-operations-operate-on-multiple-elements)

When mutating records, always consider if it is useful to update multiple elements. For example in this demo, there could be addCar, addCars, removeCar, removeCars, but the plural of each (addCars, removeCars) can be used on the singular as well, obviating the need for the singular mutation of each. So instead of having 4 mutations (2 for plural, 2 for singular), 2 mutations will suffice (2 for plural)
