import { mount } from '@vue/test-utils';
import MyCounter from '@/components/MyCounter.vue';

describe('<MyCounter />', () => {
  test('should match snapshot', () => {
    const wrapper = mount(MyCounter, {
      props: {
        value: 5,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the counter value correctly', () => {
    const value = 5;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    expect(wrapper.find('h3').text()).toContain(`Counter: ${value}`);
    expect(wrapper.find('[data-testid="square-label"]').text()).toContain(
      `Square: ${value * value}`,
    );

    expect(counterLabel.text()).toContain(`Counter: ${value}`);
    expect(squareLabel.text()).toContain(`Square: ${value * value}`);

    // console.log(wrapper.html());
  });

  test('increments the counter when +1 button is clicked', async () => {
    const value = 6;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    const btnIncrement = wrapper.find('button');
    await btnIncrement.trigger('click');

    expect(counterLabel.text()).toContain(`Counter: ${value + 1}`);
    expect(squareLabel.text()).toContain(`Square: ${(value + 1) * (value + 1)}`);
  });

  test('decrements the counter when -1 button is clicked twice', async () => {
    const value = 6;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    const btnIncrement = wrapper.find('[data-testid="minus-button"]');

    await btnIncrement.trigger('click');
    await btnIncrement.trigger('click');
    await btnIncrement.trigger('click');

    expect(counterLabel.text()).toContain(`Counter: ${value - 3}`);
    expect(squareLabel.text()).toContain(`Square: ${(value - 3) * (value - 3)}`);
  });
});
