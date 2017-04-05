# FreeScan Skeleton

Central repository for all of our data models, Pipes, etc.
Can be used by many other repositories that need this information.

Also provides a `FullLayoutComponent` so that consumers can very easily
get a dashboard up and running.


## Usage

### Save the dependency
```
yarn add @freescan/skeleton
```

### Copy some files to your repository
```
cp src/scss/_bootstrap-variables.scss your-repo/src/scss
cp src/scss/_custom-variables.scss your-repo/src/scss
cp -r src/assets your-repo/src
```

### Configure

##### Customize Styles
Customize the variables scss files to your preference.
Be sure to set the `$navbar-brand-logo` accordingly.

##### Set up index.html
Import the icons and fonts you intend to use:
```
<!-- Icons -->
<link href="assets/css/font-awesome.min.css" rel="stylesheet">
<link href="assets/css/simple-line-icons.css" rel="stylesheet">

<!-- Premium icons -->
<link href="assets/css/glyphicons.css" rel="stylesheet">
<link href="assets/css/glyphicons-filetypes.css" rel="stylesheet">
<link href="assets/css/glyphicons-social.css" rel="stylesheet">
```

Lastly, make a script tag which sets the theme to `bs4` for some Bootstrap 4 functionality to work properly:
```
<script>
    window.__theme = 'bs4';
</script>
```

##### Extend FullLayoutComponent
In your `AppComponent`, extend the `FullLayoutComponent` from **@freescan/skeleton**,
and call the `<freescan-dashboard>` component within your `AppComponent` template.

The `FullLayoutComponent` takes an input parameter called `navigation`, the structure of which is
defined by an exported class called `Navigation`. You can provide click handlers, show/hide logic, etc.

Make sure you implement `OnInit` in your AppComponent, and call the `this.attemptLogin()` method
provided by the `FullLayoutComponent`, along with any other initialization functionality you require.

Extending the `FullLayoutComponent` gives you access to several common methods.
Be sure to check it out.

##### Routing
Routing behaves as any typical Angular app.



## Build something amazing!
