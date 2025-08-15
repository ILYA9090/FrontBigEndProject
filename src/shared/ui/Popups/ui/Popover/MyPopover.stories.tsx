import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyPopover } from './MyPopover';

export default {
  title: 'shared/Popover',
  component: MyPopover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MyPopover>;

const Template: ComponentStory<typeof MyPopover> = (args) => (
  <MyPopover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
