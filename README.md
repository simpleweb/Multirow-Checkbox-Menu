jQuery Plugin: Multi Row Checkbox Menu
==============================
By Tom Holder - [http://www.simpleweb.co.uk](http://www.simpleweb.co.uk)

Overview
--------
This is an unobtrusive jQuery plugin to put those cool little Google Gmail type 'Select All/Select None' action menus at the top of a list of check boxes.

Usage
-----
First include the `jquery.multirowcheckboxmenu.js` file in your page.

    <script src="/path/to/jquery.js" type="text/javascript"></script>
    <script src="/path/to/jquery.multirowcheckboxmenu.js" type="text/javascript"></script>

Markup your menus as follows:

    <div class="multiRowCheckboxMenu">
        <input type="submit" name="Delete" value="Delete" />
        <input type="submit" name="Merge" value="Merge" />
    </div>

You will notice the markup just contains form submit buttons. This is so the functionality degrades without javascript. If Javascript is enabled, each submit input will be replaced with an element in the menu drop down. The form will be submitted with the same named action value.

Then apply the multirowcheckbox plugin to the container:

    $('div.multiRowCheckboxMenu').checkboxMenu();

If you ID or class the submit buttons inside the container, those IDs/classes will get passed over to the LIs to provide more styling control.

The plugin can also be used as a simple filter menu without the checkbox for things such as Sort Alphabetically, Filter by Letter etc. To do this, you must just have a input item with a class of selected.  See index.html for example.

Background
----------

This plugin was built for our fabulous ContactZilla product! [http://contactzilla.com/](http://contactzilla.com/)

[Example](http://simpleweb.github.com/Multirow-Checkbox-Menu/)

License
-------
This plugin is licensed under both the GPL and MIT licenses. Choose which ever one suits your project best.

[![ContactZilla.com](http://github.com/simpleweb/jQuery-Multi-Row-Input/raw/master/contactzilla.png)](http://contactzilla.com/)