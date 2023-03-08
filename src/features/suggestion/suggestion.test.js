import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen } from '../../test-utils';
import App from '../../App';

const handlers = [
  rest.get('http://localhost:3004/api/suggestion', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          imageUrl: 'https://images.dog.ceo/breeds/malinois/n02105162_5417.jpg',
          caption: 'Malinois',
        },
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('displays a dog suggestion', async () => {
  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText(/malinois/i)).toBeInTheDocument();
});

