net use x: \\192.168.87.2\sambashare /persistent:yes
cd C:\Users\jakes\source\repos\LadsOnTour

robocopy C:\Users\jakes\source\repos\LadsOnTour\Publish \\192.168.87.2\sambashare\Production\ladsontour /mir
pause