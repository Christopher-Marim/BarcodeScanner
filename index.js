/**
 * @format
 */
import React from 'react'
import {Provider} from 'react-redux'
import Routes from './src/routes/index';
import { registerRootComponent } from 'expo';

import storeConfig from './src/store/storeConfig'

const Redux =() => (
    <Provider store = {storeConfig}>
        <Routes></Routes>
    </Provider>
)

registerRootComponent(Redux);