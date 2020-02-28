# dwp-test

This app accesses an external API at https://bpdts-test-app.herokuapp.com/ and creates a list of its users filtered by those listed as living in London, and those currently within 50 miles of the city. It then provides an API by which to access this filtered data, with the endpoint: **/nearlondon**.

In order to improve response time, the retrieval of data from the external API and the serving of data to clients is separated. The internal data is updated from the external API at 60 second intervals. This results in a >100 times improvement in response time to incoming client requests. A full profile is shown below.

## Installation instructions
- After cloning the repo, you will need to navigate to the folder containing the package.json file and use the command ```npm install``` to install the required packages and dependencies.

## Launching server
- Once installed you can launch the server with: ```npm start```.
- If you then direct your browser (or other client) to http://localhost:3000/nearlondon you will be able to get the list of users either living in London or currently within 50 miles of it.

## Running tests
- To run the test suite use: ```npm test```.

## Performance profile
Below is a basic performance profile obtained using 10 concurrent connections, making continuous requests over 70 seconds:
```
Running 70s test @ http://localhost:3000/nearlondon
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 0 ms │ 1 ms │ 2 ms  │ 2 ms │ 0.72 ms │ 0.58 ms │ 14.05 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬───────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5% │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 2875    │ 5779    │ 8615    │ 8943  │ 8402.33 │ 826.47  │ 2875    │
├───────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 4.84 MB │ 9.73 MB │ 14.5 MB │ 15 MB │ 14.1 MB │ 1.39 MB │ 4.84 MB │
└───────────┴─────────┴─────────┴─────────┴───────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

588k requests in 70.05s, 990 MB read
```
