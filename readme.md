# FreeScan Skeleton

[![codebeat badge](https://codebeat.co/badges/d131f852-3d63-4359-93cd-131cfdf4e04b)](https://codebeat.co/a/michael/projects/github-com-freescandotcom-freescan-skeleton-master)

Central repository that provides a `StudioModule` and `DashboardModule` with many features in each.

The `StudioModule` can be imported with an `environment` configuration
(accessed from `FREESCAN_ENV` token) for access to services, components,
directives, pipes, etc. It includes tools such as modals, date selectors,
notifications, drop-downs, etc. It can be re-imported into any lazy-loaded module.

The `DashboardModule` requires the `StudioModule` be loaded first. It provides a wrapper
with dynamic navigation and SCSS scaffolding to get a new dashboard/website up and running
quickly with the services above.


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

##### Set up your AppModule
```
import { environment } from '@env/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule, StudioModule } from '@freescan/skeleton';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StudioModule.forRoot(),
        DashboardModule,
    ],
    providers: [
        { provide: FREESCAN_ENV, useValue: environment },
    ],
})
```


##### Extend DashboardComponent
In your `AppComponent`, extend the `DashboardComponent` from **@freescan/skeleton**,
and call the `<freescan-dashboard>` component within your `AppComponent` template.

The `DashboardComponent` takes an input parameter called `navigation`, the structure of which is
defined by an exported class called `Navigation`. You can provide click handlers, show/hide logic, etc.

Make sure you implement `OnInit` in your AppComponent, and call the `this.attemptLogin()` method
provided by the `DashboardComponent`, along with any other initialization functionality you require.

Extending the `DashboardComponent` gives you access to several common methods.
Be sure to check it out.



##### Routing
Routing behaves as any typical Angular app.



## Build something amazing!
