# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions :

1. An agent can be booked at Shifts by different Facilities.   (I understand like Agents are like job workers and shift  is like job posted by Facility which need to be fullfilled.)

2. So same agent could have different Custom Ids assigned by different Facilities.

3. If custom id is not present for an Agent , print the existing database Ids ( may be with warning/distinction that custom id is not assigned to the agent)

4. Max character limit of Custom id is 100

5. Meta data of shifts about agent returned by `getShiftsByFacility` contains agent's original database id.

6. Facility has a client application through they can view the Agents they work with.

7. Database provider used is SQL based.

### General Idea of ticket breakdown
<hr />

Create a new table like CustomIdTable , which maps a custom id to a agent and the facility which assigned it.

Then keep most of the existing codebase or services same , just that when printing an 'id' of agent in the report for a facility,

check in this table if that facility created a custom id for this agent and if it did , print that, else print the original database id of the

agent which some warning /indication that its a original database id.


### Ticket no. 1 : Create a new table CUSTOMID 
<hr />

Table will have following fields -

- id : UNIQUE of the record or row (Primary key)
- agentId : Reference pointing to an Agent (Foreign Key)
- facilityId : Reference pointing to a Facility (Foreign Key)
- label : Text with char. limit upto 100 (this limit can be discussed with facilities)
- createdAt: Datetime
- updatedAt: Datetime

#### Implementation

Create a table in the Database provider using sql query - `create table <tablename> (col1 type, ...)`

#### Time

1 hour

#### Acceptance Criteria

An engineer should be able to view a new table CUSTOMID in database and alse perform
query on it.



### Ticket no. 2 : Create an endpoint getCustomIdByAgentAndFacility
<hr />

This endpoint will take agent id , facility id and will return the customId label if exists in the CUSTOMID table else it will return null.

`getCustomIdByAgentAndFacility(agentId,facilityId){
    returns customId or null
}`

#### Implementation

In the body of the function query the table CUSTOMID to get a record where agentId, facilityId is as per the parameters
If query succeeds return the label of the returned agent object else return null

#### Time

2 hour

#### Acceptance Criteria

- The function created should return a customId if it exists for an agent and facility
- The function should return null if for an agent and facility custom id doesn't exist

### Ticket no. 3 : Update `generateReport` function to print customId for an agent if it exists
<hr />

So pass a new parameter to it - `facilityId` besides the list of shifts , it already takes (mentioned in question).

Now there must be a place where original database id of agent is printed in the function.So there or before it , add an API call

to `getCustomIdByAgentAndFacility(agentId,facilityId)` and it this API returns something print that else , print original agentId with formatted colors / extra text  that "No Custom Id assigned".

#### Implementation

Pass `facilityId` parameter to `generateReport` wherever it is called.
Find the agentId or similar variable being printed in the `generateReport` function.
Before that call the getCustomIdByAgentAndFacility function to fetch custom id and print it if it exist else print original database id.

#### Time

1 hour

#### Acceptance Criteria

Facility should see custom id of an agent if it had created it.

### Ticket no. 4 : Create and update operations or api for CUSTOMID table
<hr />

Create all the 3 APIs - create , update a custom id.
This will be useful for Facility client , to provide it with CRUD ability forof customId for an agent.

#### Implementation

1. Add a POST api for creating a new custom id.
It will take agentId, facilityId, and the label for customId.Then add an entry for the same in the DB.
createCustomId(agentId, facilityId , label){
    returns 200 on success , if error return error
}
2. Add a PUT api for updating a new custom id.
It will take agentId, facilityId , and the new label.

updateCustomId(agentId, facilityId , label){
    returns 200 on success , if error return error
}


#### Time

2 hour

#### Acceptance Criteria

- on hitting createCustomId API with correct parameters , it should create a correct entry in the CUSTOMID table
- on hitting updateCustomId API with correct parameters , it should update the correct entry in the CUSTOMID table


### Ticket no. 5 : Update client UI of facilities to CRUD custom id against an agent
<hr />

In the client side application code where the agent information is shown to a facility who uses this application,

add a HTML form to assign/update custom id to the agent.

#### Implementation

Where the card of Agent is shown in the client side application for Facility. There add a form
to submit 1 field - customId against the agent.

If the customId exists , it should be autopopulated in the field.

In the API request it should send 2 more fields - agentId, facilityId.
Agent id must be available in the agent card and facility id must be available as that application user belongs to a facility.

Also based upon customId exists or not , send  a PUT request or POST request

#### Time

2 hour

#### Acceptance Criteria

Facility should be able to add / edit customId against any agent







