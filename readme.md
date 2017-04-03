# FreeScan Skeleton

Central repository for all of our data models, Pipes, etc.
Can be used by many other repositories that need this information.

Also provides a `FullLayoutComponent` so that consumers can very easily
get a dashboard up and running.


### Usage

##### Save the dependency
```
yarn add @freescan/skeleton
```

##### Copy some files to your repository
```
cp src/scss/_bootstrap-variables.scss your-repo/src/scss
cp src/scss/_custom-variables.scss your-repo/src/scss
cp -r src/assets your-repo/src
```

##### Configure
* Customize the variables scss files to your preference. Be sure to set the `$navbar-brand-logo` accordingly.
* Set up index.html accordingly
* Set up your AppRouting accordingly with the `FullLayoutComponent` as a parent. See the `freescan.routing.ts` for an example.

## Build something amazing!
