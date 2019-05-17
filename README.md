 You need to install Node.js first.
 Then, you need to install Yarn using Npm like this:
 
  npm install --global yarn
  
  So, you can use Yarn to install libraries in packages.json like this:
  yarn install
  
  Then build project:
  
  yarn build
  
  And then run project:
  
  yarn start
  
  
  NOTE:
  
  If you get an error like this, just try SET instead of Export in  package.json like this:
  
      "start": "set HTTPS=true&&PORT=3000 react-scripts start",

  
  C:\Users\Mert\clientha>yarn start
yarn run v1.16.0
$ export HTTPS=true&&PORT=3000 react-scripts start
'export' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.



  
  
