/*
    Import 3rd Party Libraries
---------------------------------*/

import 'jquery';
import 'bootstrap';
import 'wow.js';
import 'sweetalert2/src/sweetalert2.scss';

/*
    Import Fonts, Images & SASS Files
--------------------------------------------*/

import '../scss/app.scss';
require.context('../fonts', true);
require.context('../images', true);

/*
    Import Custom TS Files
--------------------------------------------*/

import './app.ts';