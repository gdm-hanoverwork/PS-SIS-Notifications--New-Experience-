# PS-SIS-Notifications--New-Experience-
Update to the Notifications Plugin on PowerSource Community Exchange, download ID 657, originally created by David Pond

Important note from the original developer(s):
IMPORTANT!!! 
If you run this plugin with your system log turned on the "Thorough" or "Debug" setting, you will experience performance issue. This customization uses page fragments to insert the notification. Turning the system log on Thorough or Debug will log several lines for every page hit which displays the notification. If for some reason you must turn the system logging up, please disable the Notifier Plugin to prevent performance issues. 
This setting may be found under the following location: 
System > System Settings > System Logs > System Log 

As of 6/12/2021 the main branch contains version 2.1.4:
* JSON fixes from the community exchange (comment post #150)
* fixed notifier.js to get messages to show up in 20.X.
* the notifications use the feedback-info class that is already built into PS SIS, other options include
  * feedback-confirm - green
  * feedback-alert - orange
  * feedback-error - red
  * feedback-note - blue with a note icon   
* added code to notifier.js so the notifications don't show up in CPM (may be needed for other pages if I stumble across any that did what CPM did)

