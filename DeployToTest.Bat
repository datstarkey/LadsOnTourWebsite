net use x: \\192.168.87.2\sambashare /persistent:yes
cd C:\Users\jakes\source\repos\LadsOnTour
dotnet publish -o /publish

robocopy C:\Users\jakes\source\repos\LadsOnTour\Publish \\192.168.87.2\sambashare\Test\ladsontour /mir
#if NOT["%errorlevel%"]==["0"] pause
pause