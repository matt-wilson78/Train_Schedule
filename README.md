# Train_Schedule

Demo app here: https://matt-wilson78.github.io/Train_Schedule/

An app to populate a train schedule with various bits of information:

- Train Name
- Destination
- Frequency of arrival
- Time the train will arrive
- Time until arrival in minutes

Also includes a form, giving users the ability to add new trains to the schedule.

This app uses moment.js to do time calculations, such as time until arrival & minutes away.

Firebase is used to store the schedule information until manually deleted.

You will be able to open this app, observe trains that are currently added, and add your own.

If you close the app, the information is persistent. When you re-open, you'll be able to access the information that was there, the information you added, and any information other users may have added. The times will be updated by moment.js, so you will see the most up to date arrival times and minutes until arrival.

I would like to add the ability to remove trains, but have run out of time. Will continue working on this feature.
