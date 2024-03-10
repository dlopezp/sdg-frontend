import { afterEach, describe, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import App from './../src/App'

describe('App should', () => {
    afterEach(cleanup);

    it('render', () => {
        render(<App />)
    })
})