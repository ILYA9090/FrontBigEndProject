import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button/Button';
import { MenuComponent } from './MenuComponent';

export default {
  title: 'shared/<MenuComponent',
  component: MenuComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MenuComponent>;

const Template: ComponentStory<typeof MenuComponent> = (args) => (
  <MenuComponent {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open</Button>,
  items: [
    {
      content: '1',
    },
    {
      content: '2',
    },
  ],
};
