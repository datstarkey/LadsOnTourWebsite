# Lads On Tour Website

Full Stack solution for the Lads On Tour Website.

Backend done in .net core 3.1 ASP

Frontend done in Angular 9 - Located in the ClientApp Folder

Requires a PostgreSQL Database, Entity Framework migrations included in the solution

Nebular was used for some of the theme

## Running Local Version

Clone this repo

```
Git clone https://https://github.com/datstarkey/LadsOnTourWebsite
```

create an appsettings.json file in the root containing the following

```
{
  "ConnectionStrings": {
    "DefaultConnection": ""
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "Jwt": {
    "Key": "",
    "Issuer": "jakestarkey.dev"
  },
  "BattleNet": {
    "ClientId": "",
    "ClientSecret": "",
    "BearerToken": ""
  },
  "Discord": {
    "ClientId": "",
    "ClientSecret": ""
  },
  "Twitch": {
    "ClientId": "",
    "ClientSecret": ""
  },
  "APIKeys": {
    "Keys": ""
  },
  "AllowedHosts": "*"
}
```

Ensuring to add all your own client Id's secrets and API keys so the authentication works.

The DefaultConnection string is for PostgreSQL and should look like this:

```
"Server=localhost; Port=5432; Database=MYDATABASENAME; Username=MYPOSTGRESQL-USER; Password=MYPOSTGRESQL-PASSWORD"
```

Then run the server, it should build the front end for development purposes.
