import { render, screen } from '@testing-library/react';
import { ReactMediaQuery } from '.';

describe('ReactMediaQuery', () => {
  it('render', async () => {
    render(<ReactMediaQuery>foobar</ReactMediaQuery>);
    await screen.findByText('foobar');
  });
});
